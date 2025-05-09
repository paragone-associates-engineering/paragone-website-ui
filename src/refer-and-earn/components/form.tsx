
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinUsFormSchema, joinUsFormSchema } from "../../schema/contact";
import axios from "axios";
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../services/api"
import CustomButton from "../../common/button";



const ReferAndEarnForm = () => {
  
   const {
          register,
          handleSubmit,
          control,
          formState: { errors, isSubmitting },
        } = useForm<JoinUsFormSchema>({
          resolver: zodResolver(joinUsFormSchema),
          defaultValues: {
            name: { first: "", lastName: "" },
            email: "",
            phoneNumber: "",
            participation: "",
            location:"",
          },
        });
      
        const onSubmit = async (data: JoinUsFormSchema) => {
          try {
            await axios.post(`${API_BASE_URL}/form/join-us`, data);
            toast.success("Form submitted successfully!");
            console.log('suscess', data);
          } catch (error) {
            toast.error("Submission failed. Try again!");
            console.log('error', error)
          }
        };

  return (
    
              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography variant='h6' sx={{mb:1}}>First Name</Typography>
                    <TextField
                      fullWidth
                      label="First name"
                      {...register("name.first")}
                      error={!!errors.name?.first}
                      helperText={errors.name?.first?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6' sx={{mb:1}}>Last Name</Typography>
                    <TextField
                      fullWidth
                      label="Last name"
                      {...register("name.lastName")}
                      error={!!errors.name?.lastName}
                      helperText={errors.name?.lastName?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6' sx={{mb:1}}>Email</Typography>
                    <TextField
                      fullWidth
                      label="Email address"
                      type="email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6' sx={{mb:1}}>Phone Number</Typography>
                    <TextField
                      fullWidth
                      label="Phone number"
                      {...register("phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant='h6' sx={{mb:1}}>Type of service Interested</Typography>
                    <FormControl fullWidth error={!!errors.participation}>
                                          <InputLabel id="Participation-label">Service</InputLabel>
                                          <Controller
                                            name="participation"
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field} labelId="participation-label">
                                                <MenuItem value="real-estate">Real Estate Agent</MenuItem>
                        <MenuItem value="broker">Property Broker</MenuItem>
                        <MenuItem value="consultant">Business Consultant</MenuItem>
                        <MenuItem value="other">Other Professional</MenuItem>
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.participation && <Typography color="error" sx={{fontSize:'12px',textTransform:'capitalize'}}>{errors.participation.message}</Typography>}
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6' sx={{mb:1}}>Location</Typography>
                    <FormControl fullWidth error={!!errors.location}>
                                          <InputLabel id="location-label">Location</InputLabel>
                                          <Controller
                                            name="location"
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field} labelId="location-label">
                                                <MenuItem value="lagos">Lagos</MenuItem>
                        <MenuItem value="abuja">Abuja</MenuItem>
                        <MenuItem value="ph">Port Harcourt</MenuItem>
                        <MenuItem value="ibadan">Ibadan</MenuItem>
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.location && <Typography color="error" sx={{fontSize:'12px',textTransform:'capitalize'}}>{errors.location.message}</Typography>}
                  </Grid>
                  
                  <Grid item xs={12}>
                    <CustomButton isLoading={isSubmitting} sx={{px:7, py:1}}>
                      Submit Now
                    </CustomButton>
                  </Grid>
                </Grid>
              </Box>         
  )
}

export default ReferAndEarnForm

