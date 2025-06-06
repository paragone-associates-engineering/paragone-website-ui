import { useState} from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Typography,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../../common/button';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetInTouchFormSchema, getInTouchFormSchema } from "../../schema/contact";
import axios from "axios";
import toast from "react-hot-toast"
import { API_BASE_URL } from "../../services/api"
import { propertyTypes } from '../../constant';

// interface ContactFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   propertyType: string;
//   address: string;
//   contactMethod: string;
//   contactTime: string;
//   sellTime: string;
//   comments: string;
// }

export const ContactFormModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
   const {
          register,
          handleSubmit,
          control,
          reset,
          formState: { errors, isSubmitting },
        } = useForm<GetInTouchFormSchema>({
          resolver: zodResolver(getInTouchFormSchema),
          defaultValues: {
            name: { first: "", lastName: "" },
            email: "",
            phoneNumber: "",
            propertyType: "",
            additionalComment: "",
            address:"",
            contactMethod:"",
            contactTime: "",
            sellDate: ""
          },
        });
      
        const onSubmit = async (data: GetInTouchFormSchema) => {
          try {
            await axios.post(`${API_BASE_URL}/form/connect-with-us`, data);
            toast.success("Form submitted successfully!");
            reset();
           // console.log('suscess', data);
          } catch (error) {
            toast.error("Submission failed. Try again!");
            console.log('error', error)
          }
        };
  
  return (
    <Box>
      
      <CustomButton sx={{ py: 1, px: 5 }} onClick={handleOpen}>
        Get Started
      </CustomButton>

     
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: 'secondary.main',
            maxWidth:'700px',
            width: '100%',
            m: { xs: 1, sm: 2, md: 3 }
          }
        }}
      >
        <DialogTitle sx={{ pt: 3, pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h2" fontWeight="bold">
              Connect with us
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pb: 4,  "&::-webkit-scrollbar": { display: "none" } }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>First name</Typography>
                <TextField
                  fullWidth
                  sx={{bgcolor:"#fff"}}
                  placeholder="First Name"
                  {...register("name.first")}
                  error={!!errors.name?.first}
                  helperText={errors.name?.first?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>Last name</Typography>
                <TextField
                  fullWidth
                  sx={{bgcolor:"#fff"}}
                  placeholder="Last name"
                      {...register("name.lastName")}
                      error={!!errors.name?.lastName}
                      helperText={errors.name?.lastName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>Email address</Typography>
                <TextField
                  fullWidth
                  sx={{bgcolor:"#fff"}}
                 placeholder="email"
                  {...register("email")}
                  error={!!errors?.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>Phone number</Typography>
                <TextField
                  fullWidth
                  sx={{bgcolor:"#fff"}}
                  placeholder="+00 123 456 789"
                      {...register("phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>Property type</Typography>
                <FormControl fullWidth error={!!errors.propertyType}>
                                          <InputLabel id="property-type-label">Property Type</InputLabel>
                                          <Controller
                                            name="propertyType"
                                            
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field}  sx={{bgcolor:"#fff"}} labelId="property-type-label">
                                                 {propertyTypes.map(opt => (
                                                  <MenuItem key={opt.value || "placeholder"} value={opt.value}>
                                                    {opt.label}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.propertyType && <Typography color="error">{errors.propertyType.message}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>Address</Typography>
                <TextField
                  fullWidth
                  sx={{bgcolor:"#fff"}}
                  placeholder="Address here"
                  {...register("address")}
                  error={!!errors?.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>Preferred Method of Contact</Typography>
                <FormControl fullWidth error={!!errors.contactMethod}>
                                          {/* <InputLabel id="contact-method-label">Property Type</InputLabel> */}
                                          <Controller
                                            name="contactMethod"
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field}  sx={{bgcolor:"#fff"}} labelId="contact-method-label">
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.contactMethod && <Typography color="error">{errors.contactMethod.message}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>

                <Typography variant="h6" sx={{ mb: 1 }}>Best Time to Contact</Typography>
                <FormControl fullWidth error={!!errors.contactTime}>
                                          {/* <InputLabel id="contact-method-label">Property Type</InputLabel> */}
                                          <Controller
                                            name="contactTime"
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field}  sx={{bgcolor:"#fff"}} labelId="contact-time-label">
                 <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.contactTime && <Typography color="error">{errors.contactTime.message}</Typography>}
               
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>When do you want to sell</Typography>
                <FormControl fullWidth error={!!errors.sellDate}>
                                          {/* <InputLabel id="contact-method-label">Property Type</InputLabel> */}
                                          <Controller
                                            name="sellDate"
                                            control={control}
                                            render={({ field }) => (
                                              <Select {...field}  sx={{bgcolor:"#fff"}} labelId="sell-date-label">
                <MenuItem value="This Month">This month</MenuItem>
                  <MenuItem value="next_month">Next month</MenuItem>
                  <MenuItem value="3_months">Within 3 months</MenuItem>
                  <MenuItem value="6_months">Within 6 months</MenuItem>
                  <MenuItem value="year">Within a year</MenuItem>
                                              </Select>
                                            )}
                                          />
                                        </FormControl>
                                        {errors.sellDate && <Typography color="error">{errors.sellDate.message}</Typography>}
               
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>Additional Comments</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  sx={{bgcolor:"#fff"}}
                  placeholder="Write comments here"
                  variant="outlined"
                  {...register("additionalComment")}
                  error={!!errors?.additionalComment}
                  helperText={errors.additionalComment?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton isLoading={isSubmitting} sx={{ mt: 2, py: 1.5, width:'100%'  }}>
                  Send message
                </CustomButton>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};