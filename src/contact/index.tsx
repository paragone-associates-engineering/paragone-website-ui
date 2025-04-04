// import type React from "react"
// import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  //Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  //type SelectChangeEvent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageBanner } from "../common/banner/page-banner"
import axios from "axios";
import toast from "react-hot-toast"
import { API_BASE_URL } from "../services/api"
import CustomButton from "../common/button"
import { contactFormSchema, ContactFormSchema } from "../schema/contact";

const Contact = () => {
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
    <Box sx={{width:'100vw'}}>
     <PageBanner title='Contact Us' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: "100%", backgroundColor: "background.paper", borderRadius: 2 }}>
              <List sx={{display:'flex', flexDirection:'column', gap:3, "& .MuiListItem-root": { px: 0 } }}>
              <ListItem sx={{display:'flex', alignItems:'flex-start', gap:2, border:'1px solid #ddd', borderRadius:'10px', px:3, py:2}}>
              <img src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742485281/Group_72_qagsym.svg' width='45px' height='45px' alt='email icon' style={{marginLeft:10, marginTop:4}} />
                 
                  <ListItemText
                    primary="Address:"
                    secondary="7, Sola Gbadayi Street, off 21 Road, Gowon Estate, Lagos."
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      gutterBottom: true,
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                  />
                </ListItem>

                <ListItem sx={{display:'flex', alignItems:'flex-start', gap:2, border:'1px solid #ddd', borderRadius:'10px', px:3, py:2}}>
                <img src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742485285/Group_73_ajvzu6.svg' width='45px' height='45px' alt='email icon' style={{marginLeft:10, marginTop:4}} />
                  <ListItemText
                    primary="Email:"
                    secondary={
                      <>
                        <Typography variant="body1" component="div">
                          support@paragonesignature.com
                        </Typography>
                        <Typography variant="body1" component="div">
                          info@paragonesignature.com
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      gutterBottom: true,
                    }}
                  />
                </ListItem>

                <ListItem sx={{display:'flex', alignItems:'flex-start', gap:2, border:'1px solid #ddd', borderRadius:'10px', px:3, py:2}}>
                <img src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742485283/Group_74_ptl10t.svg' width='45px' height='45px' alt='email icon' style={{marginLeft:10, marginTop:4}} />
                  <ListItemText
                    primary="Phone number:"
                    secondary={
                      <>
                        <Typography variant="body1" component="div">
                          (+234) 916 046 7439
                        </Typography>
                        <Typography variant="body1" component="div">
                          (+234) 915 636 2645
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      gutterBottom: true,
                    }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={0} sx={{ p: 4, backgroundColor: "background.paper", borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Leave Us a Message
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      {...register("name.first")}
                      error={!!errors.name?.first}
                      helperText={errors.name?.first?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      {...register("name.lastName")}
                      error={!!errors.name?.lastName}
                      helperText={errors.name?.lastName?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
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
                    <TextField
                      fullWidth
                      label="Phone number"
                      {...register("phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
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
                    <TextField
                      fullWidth
                      label="Message"
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
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, borderRadius: 2, overflow: "hidden", height: 500 }}>
          <iframe
            title="Paragone Signature Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3!2d3.3!3d6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJOIDPCsDE4JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Contact;