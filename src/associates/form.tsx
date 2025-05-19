
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
import { JoinUsFormSchema, joinUsFormSchema } from "../schema/contact";
import axios from "axios";
import toast from "react-hot-toast"
import { API_BASE_URL } from "../services/api"
import CustomButton from "../common/button";

const AssociateForm = () => {
  
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
                    <Typography variant='h6' sx={{mb:1}}>How do you participate in the real estate industry?</Typography>
                    <FormControl fullWidth error={!!errors.participation}>
                                          <InputLabel id="Participation-label" sx={{backgroundColor: 'white'}}>Select here</InputLabel>
                                          <Controller
                                            name="participation"
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field} labelId="participation-label">
                                                <MenuItem value="I'm an experienced real estate agent">I'm an experienced real estate agent</MenuItem>
                        <MenuItem value=" I lead a team of agents"> I lead a team of agents</MenuItem>
                        <MenuItem value="I'm a listing agent">I'm a listing agent</MenuItem>
                        <MenuItem value="I'm a leasing agent">I'm a leasing agent</MenuItem>
                         <MenuItem value="I manage property portfolios for clients (property manager)">I manage property portfolios for clients (property manager)</MenuItem>
                          <MenuItem value="I work primarily in new developments/ offplan properties">I work primarily in new developments/ offplan properties</MenuItem>
                           <MenuItem value="I focus on luxury/ high-end property sales">I focus on luxury/ high-end property sales</MenuItem>
                            <MenuItem value="I'm newly minted and looking to getting started in real estate sales">I'm newly minted and looking to getting started in real estate sales </MenuItem>
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.participation && <Typography color="error" sx={{fontSize:'12px',textTransform:'capitalize'}}>{errors.participation.message}</Typography>}
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                  <Typography variant='h6' sx={{mb:1}}>Location</Typography>
                     <TextField
                                                  fullWidth
                                                  label="Location"
                                                  {...register("location")}
                                                  error={!!errors?.location}
                                                  helperText={errors?.location?.message}
                                                />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <CustomButton isLoading={isSubmitting} sx={{width:'100%', py:1, mt:3}}>
                      Join Now
                    </CustomButton>
                  </Grid>
                </Grid>
              </Box>         
  )
}

export default AssociateForm

