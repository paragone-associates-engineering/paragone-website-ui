
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  //Button,
  Paper,
  FormControl,
  Select,
  MenuItem,
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
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
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
      reset();
     // console.log('suscess', data);
    } catch (error) {
      toast.error("Submission failed. Try again!");
      console.log('error', error)
    }
  };

  return (
     <>
              <Helmet>
                <title>Contact Us | Paragone Signature & Associates</title>
                <meta
                  name="description"
                  content="At Paragone Signature & Associates, we are on a mission to transform the real estate industry through innovation, exceptional service, and the collective talents of our team members, each contributing their unique strengths to our collective success."
                />
              </Helmet>
    <Box sx={{width:'100vw'}}>
     <PageBanner title='Contact Us' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <Container maxWidth="lg" sx={{ py:{xs:3,sm: 6} }}>
        <Grid container spacing={{xs:3,sm: 6}}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: {xs:1.3,sm: 4}, height: "100%", backgroundColor: "background.paper", borderRadius: 2 }}>
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
                          (+234) 816 046 7439
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

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, backgroundColor: "background.paper", borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Leave Us a Message
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: {sm:3} }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <Typography variant='h6' sx={{mb:1}}>First Name</Typography>
                    <TextField
                      fullWidth
                     placeholder="First name"
                      {...register("name.first")}
                      error={!!errors.name?.first}
                      helperText={errors.name?.first?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <Typography variant='h6' sx={{mb:1}}>Last Name</Typography>
                    <TextField
                      fullWidth
                      placeholder="Last name"
                      {...register("name.lastName")}
                      error={!!errors.name?.lastName}
                      helperText={errors.name?.lastName?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <Typography variant='h6' sx={{mb:1}}>Email</Typography>
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
                     <Typography variant='h6' sx={{mb:1}}>Phone Number</Typography>
                    <TextField
                      fullWidth
                     placeholder="Phone number"
                      {...register("phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.reason}>
                      <Typography variant='h6' sx={{mb:1}}>Reason</Typography>
                      <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} labelId="reason-label" displayEmpty>
                            <MenuItem value='' disabled>Choose a reason</MenuItem>
                            <MenuItem value="I want to buy a property">I want to buy a property</MenuItem>
                            <MenuItem value="I want to sell my property">  I want to sell my property</MenuItem>
                            <MenuItem value="I'm looking to rent a property">I'm looking to rent a property</MenuItem>
                            <MenuItem value="I'd like you to manage my property">I'd like you to manage my property</MenuItem>
                            <MenuItem value="I'm a landlord renting out my property">I'm a landlord renting out my property</MenuItem>
                            <MenuItem value="I'd like to refer a client to buy a property">I'd like to refer a client to buy a property</MenuItem>
                            <MenuItem value="I'm interested in advertising on your website">I'm interested in advertising on your website</MenuItem>
                            <MenuItem value="I'm interested in becoming an agent for PSA">I'm interested in becoming an agent for PSA</MenuItem>
                            <MenuItem value=" I'd like to provide a feedback/ suggestion"> I'd like to provide a feedback/ suggestion</MenuItem>
                            <MenuItem value=" Others"> Others</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                    {errors.reason && <Typography color="error">{errors.reason.message}</Typography>}
                  </Grid>

                  <Grid item xs={12}>
                     <Typography variant='h6' sx={{mb:1}}>Message</Typography>
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
                    <CustomButton isLoading={isSubmitting} sx={{ width: "140px" }}>
                      Send Message
                    </CustomButton>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box 
  sx={{ 
    width: '100%',
    height: '100vh', 
    position: 'relative',
    overflow: 'hidden',
    marginTop:10,
  }}
>
  {/* The wrapper ensures the iframe maintains aspect ratio and fills space */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15853.511524741247!2d3.2634984970347864!3d6.599872300000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91fc784c6d97%3A0x9e9fe1cd213e6742!2sParagone%20Signature%20%26%20Associates%20Limited!5e0!3m2!1sen!2sng!4v1746545522032!5m2!1sen!2sng"
      style={{
        width: '100%',
        height: '90%',
        border: 'none',
        borderRadius:8
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </Box>
</Box>
      </Container>
    </Box>
    </>
  )
}

export default Contact;
