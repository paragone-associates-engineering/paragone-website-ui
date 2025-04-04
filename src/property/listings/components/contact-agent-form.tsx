
import {
  Typography,
  Box,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { PageBanner } from "../common/banner/page-banner"
import axios from "axios";
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../../services/api"
import CustomButton from "../../../common/button"
import { contactFormSchema, ContactFormSchema } from "../../../schema/contact";

const ContactAgentForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: { first: "", lastName: "" },
      email: "",
      phoneNumber: "",
      reason: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      await axios.post(`${API_BASE_URL}/form/get-in-touch`, data);
      toast.success("Form submitted successfully!");
      console.log('suscess', data);
    } catch (error) {
      toast.error("Submission failed. Try again!");
      console.log('error', error)
    }
  };
  return (
    
          
            <Paper elevation={0} sx={{ p: 4, backgroundColor: "secondary.main", borderRadius: 2, maxWidth:'500px',mx:'auto' }}>
              <Typography variant="h5" component="h2" gutterBottom>
               Get in touch
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                      <Typography variant='h6'>First Name</Typography>
                    <TextField
                      fullWidth
                      placeholder="First name"
                      {...register("name.first")}
                      error={!!errors.name?.first}
                      helperText={errors.name?.first?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6'>Last Name</Typography>
                    <TextField
                      fullWidth
                      placeholder="Last name"
                      {...register("name.lastName")}
                      error={!!errors.name?.lastName}
                      helperText={errors.name?.lastName?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6'>Email</Typography>
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
                  <Typography variant='h6'>Phone Number</Typography>
                    <TextField
                      fullWidth
                      placeholder="Phone number"
                      {...register("phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                  <Typography variant='h6'>Reason</Typography>
                    <FormControl fullWidth error={!!errors.reason}>
                      <InputLabel id="reason-label">Choose a reason</InputLabel>
                      <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} labelId="reason-label">
                            <MenuItem value="general">General Inquiry</MenuItem>
                            <MenuItem value="property">Property Information</MenuItem>
                            <MenuItem value="partnership">Partnership Opportunities</MenuItem>
                            <MenuItem value="career">Career Opportunities</MenuItem>
                            <MenuItem value="support">Technical Support</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                    {errors.reason && <Typography color="error">{errors.reason.message}</Typography>}
                  </Grid>

                  <Grid item xs={12}>
                  <Typography variant='h6'>Message</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      {...register("message")}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      placeholder="Write your message here"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CustomButton isLoading={isSubmitting} sx={{ width: "100%" }}>
                      Send Message
                    </CustomButton>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          
  )
}

export default ContactAgentForm;