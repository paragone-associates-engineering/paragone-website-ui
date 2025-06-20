
import { useState, useEffect } from "react"
import axios from "axios"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  CircularProgress,
} from "@mui/material"
import toast from "react-hot-toast"
import { type JobApplicationData, jobApplicationSchema } from "../schema/contact"
import { API_BASE_URL } from "../services/api"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CustomButton from "../common/button"
//import { useAppDispatch, useAppSelector } from "../redux/store"
import { searchJobs, fetchAllJobTitles, clearJobSearch, type Job } from "../redux/slices/job-slice"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"

const JobApplication = () => {
  const dispatch = useAppDispatch()
  const { allJobs, autocompleteLoading } = useAppSelector((state) => state.jobs)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobSearchValue, setJobSearchValue] = useState<string>("")

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      name: { first: "", lastName: "" },
      jobId: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
      profile: "",
      department: "",
      message: "",
      agreeToPolicy: true,
    },
  })

  
  const watchedJobId = watch("jobId")

  
  useEffect(() => {
    dispatch(fetchAllJobTitles())

    return () => {
      dispatch(clearJobSearch())
    }
  }, [dispatch])

 
  useEffect(() => {
    if (jobSearchValue.length > 2) {
      const timeoutId = setTimeout(() => {
        dispatch(searchJobs({ searchString: jobSearchValue }))
      }, 300)

      return () => clearTimeout(timeoutId)
    } else if (jobSearchValue.length === 0) {
      
      dispatch(fetchAllJobTitles())
    }
  }, [jobSearchValue, dispatch])

  const handleJobSelection = (job: Job | null) => {
    setSelectedJob(job)
    if (job) {
      setValue("jobId", job.id || job._id)
      setValue("jobTitle", job.title)
      setValue("department", job.department)
    } else {
      setValue("jobId", "")
      setValue("jobTitle", "")
      setValue("department", "")
    }
  }

  const onSubmit = async (data: JobApplicationData) => {
    try {
      const formData = new FormData()

      if (data.resume instanceof File) {
        formData.append("resume", data.resume)
      } else {
        console.error("Resume is missing or invalid")
        toast.error("Please upload a resume")
        return
      }

      const metadata = {
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profile: data.profile,
        department: data.department,
        message: data.message,
        agreeToPolicy: data.agreeToPolicy,
      }

      formData.append("metadata", JSON.stringify(metadata))

      await axios.post(`${API_BASE_URL}/jobs/apply/${data.jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast.success("Application submitted successfully!")
      reset()
      setSelectedFile(null)
      setSelectedJob(null)
      setJobSearchValue("")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("Submission Error:", error)
      toast.error(error.response.data.message || "Failed to submit application. Please try again.")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, mx: "auto" }}>
      <Grid container spacing={1.7}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" marginBottom={1}>
            First name
          </Typography>
          <TextField
            fullWidth
            placeholder="First name"
            {...register("name.first")}
            error={!!errors?.name?.first}
            helperText={errors?.name?.first?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" marginBottom={1}>
            Last name
          </Typography>
          <TextField
            fullWidth
            placeholder="Last name"
            {...register("name.lastName")}
            error={!!errors?.name?.lastName}
            helperText={errors?.name?.lastName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" marginBottom={1}>
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="Email address"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" marginBottom={1}>
            Phone Number
          </Typography>
          <TextField
            fullWidth
            placeholder="Phone number"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" marginBottom={1}>
            LinkedIn Profile
          </Typography>
          <TextField
            fullWidth
            placeholder="LinkedIn profile"
            {...register("profile")}
            error={!!errors.profile}
            helperText={errors.profile?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" marginBottom={1}>
            Job Position
          </Typography>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={allJobs}
                getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
                loading={autocompleteLoading}
                value={selectedJob}
                onChange={(_, newValue) => {
                  handleJobSelection(newValue)
                }}
                onInputChange={(_, newInputValue) => {
                  setJobSearchValue(newInputValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search and select job position"
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {autocompleteLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box>
                      <Typography variant="body2">{option.title}</Typography>
                    </Box>
                  </Box>
                )}
                isOptionEqualToValue={(option, value) => option.id === value?.id || option._id === value?._id}
                filterOptions={(options, { inputValue }) => {
                  // If we have search results, use them; otherwise filter locally
                  if (jobSearchValue.length > 2) {
                    return options
                  }
                  return options.filter((option) => option.title.toLowerCase().includes(inputValue.toLowerCase()))
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" marginBottom={1}>
            Department
          </Typography>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.department}>
                <Select {...field} displayEmpty>
                  <MenuItem value="" disabled>
                    Select Department
                  </MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="human-resource">Human Resource</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="business-development">Business Development</MenuItem>
                  <MenuItem value="property-management">Property Management</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.department && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
              {errors.department.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Upload your resume/CV
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 55 }}
          >
            {selectedFile || "Upload File"} <FileUploadOutlinedIcon />
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setValue("resume", e.target.files[0], { shouldValidate: true })
                  setSelectedFile(e.target.files[0].name)
                }
              }}
            />
          </Button>
          {errors.resume && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
              {errors.resume.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" marginBottom={1}>
            Message
          </Typography>
          <TextField fullWidth placeholder="Message" multiline rows={4} {...register("message")} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox {...register("agreeToPolicy")} defaultChecked />}
            label="I agree to the recruitment policy"
          />
          {errors.agreeToPolicy && (
            <Typography variant="caption" color="error" sx={{ display: "block" }}>
              {errors.agreeToPolicy.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <CustomButton isLoading={isSubmitting} sx={{ px: 8 }} disabled={!watchedJobId || isSubmitting}>
            Submit Now
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default JobApplication
