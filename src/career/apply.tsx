//"use client"

import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import toast from "react-hot-toast";
import { JobApplicationData, jobApplicationSchema } from "../schema/contact";
import { API_BASE_URL } from "../services/api";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CustomButton from "../common/button";

const JobApplication = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors, isSubmitting },
    } = useForm<JobApplicationData>({
      resolver: zodResolver(jobApplicationSchema),
      defaultValues: {
        name: { first: "", lastName: "" },
        jobId: "JOB-lVmjAJ5OLxxu",
        jobTitle:'Marketer', 
        email: "",
        phoneNumber: "",
        profile:"",
        department: "",
        message: "I am excited to apply for this position.",
        agreeToPolicy: true,
      },
    });
  
    const onSubmit = async (data: JobApplicationData) => {
        //console.log('Submitting form...', data);
        
        try {
            const formData = new FormData();

            if (data.resume instanceof File) {
                formData.append("resume", data.resume);
            } else {
                console.error("Resume is missing or invalid");
            }
    
            const metadata = {
                jobId: "JOB-lVmjAJ5OLxxu",
                jobTitle:'Marketer', 
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                profile: data.profile,
                department: data.department,
                message: data.message,
                agreeToPolicy: data.agreeToPolicy,
            };
    
            // Append metadata as JSON
            formData.append("metadata", JSON.stringify(metadata));
            await axios.post(`${API_BASE_URL}/jobs/apply/JOB-lVmjAJ5OLxxu`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            //console.log("Form submitted successfully:", data);
            toast.success("Application submitted successfully!");
    
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Failed to submit application. Please try again.");
        }
    };
    
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, maxWidth:'500px', mx:'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="First name" {...register("name.first")} error={!!errors?.name?.first} helperText={errors?.name?.first?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Last name" {...register("name.lastName")} error={!!errors?.name?.lastName} helperText={errors?.name?.lastName?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email address" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone number" {...register("phoneNumber")} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="LinkedIn profile" {...register("profile")} error={!!errors.profile} helperText={errors.profile?.message} />
        </Grid>
        <Grid item xs={12}>
        <Controller
    name="department"
    control={control}
    defaultValue=""
    render={({ field }) => (
        <FormControl fullWidth error={!!errors.department}>
            <InputLabel>Department</InputLabel>
            <Select {...field}>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="operations">Operations</MenuItem>
                <MenuItem value="admin">Administration</MenuItem>
            </Select>
        </FormControl>
    )}
/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Upload your resume/CV
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            {selectedFile || "Upload File"} <FileUploadOutlinedIcon />
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  console.log("File selected:", e.target.files[0]);
                  setValue("resume", e.target.files[0],  { shouldValidate: true });
                  setSelectedFile(e.target.files[0].name); 
                }
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Message" multiline rows={4} {...register("message")} />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox {...register("agreeToPolicy")} />}
            label="I agree to the recruitment policy"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton isLoading={isSubmitting} sx={{width:'100%'}}>
             Submit Now
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobApplication;
