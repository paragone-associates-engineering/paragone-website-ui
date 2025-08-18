import {
  Container,
  Typography,
  Box,
  Grid,
  //type SelectChangeEvent,
} from "@mui/material";
import Testimonials from "../../common/testimonial";
import { PageBanner } from "../../common/banner/page-banner";
import { approaches, services } from "../data";
//import { ManagementFormData } from "../types";
import PropertyManagementForm from "./form";
import CustomButton from "../../common/button";
import { AnimatedWrapper } from "../../common/animations/animated-wrapper";


const PropertyManagement = () => {

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Property Management' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Property Management" }]} />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <AnimatedWrapper animation='slideLeft'>
            <Box 
              component="img" 
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481159/new-home-keys-plan-table-with-defocused-couple_1_kper2m.png" 
              alt="Property management team" 
              sx={{ 
                width: '100%', 
                height: {xs:'100%', md:600}, 
                borderRadius: 2,
                objectFit:'cover',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
            </AnimatedWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedWrapper>
            <Typography variant="h3" component="h1" fontSize={32} gutterBottom>
              Hassle-Free Property Ownership, Maximum Returns
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              Discovering and managing properties should be an exhilarating endeavor, not a burdensome task. Paragone Signature & Associates aids you in finding properties that fit your investment goals and managing them effectively. We handle all aspects of property management, from tenant screening to maintenance, ensuring your investment income flows hassle-free.
            </Typography>
            <Typography variant="body1"   marginTop={4} color='#5A6164'>
              Our property management services are designed to optimize your investment's value while minimizing your workload. We support through tenant screening to ensure reliable tenants, regular maintenance to preserve property value, and efficient rent collection to keep your property in prime condition.
            </Typography>
            <Typography variant="body1"  marginTop={4} color='#5A6164'>
            We also provide comprehensive financial management services, including rent collection, expense tracking, and detailed financial reports. Our transparent approach ensures you’re always informed about your investment's performance. Whether you own a single property or a diverse portfolio, Paragone Signature & Associates property management services are tailored to meet your distinct requirements.
            </Typography>
            </AnimatedWrapper>
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center" sx={{ my: 8 }}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              How We Serve
            </Typography>
            
            <Grid container spacing={3}>
              {services.map((approach, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    
                    <Box>
                      <Typography variant="h6" component="h3" sx={{fontSize:'1.2rem', fontWeight:'bold'}} gutterBottom>
                        {approach.title}
                      </Typography>
                      <Typography variant="body2">
                        {approach.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <a href='#management-form'>
            <CustomButton
              sx={{ mt: 3, width:150 }}
            >
              Send Message
            </CustomButton>
            </a>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimatedWrapper>
            <Box 
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481156/apartment-building-city-with-copy-space_1_edxvmz.png"
              alt="Modern apartment building"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
            </AnimatedWrapper>
          </Grid>
          
        </Grid>
        
        <Grid container spacing={6} alignItems="center" sx={{ my: 8 }}>
          <Grid item xs={12} md={6}>
            <AnimatedWrapper>
            <Box 
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481147/sadiq-ali-LfRn3yxsrQo-unsplash_1_xwavv3.png"
              alt="Modern apartment building"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
            </AnimatedWrapper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Approach
            </Typography>
            
            <Grid container spacing={3}>
              {approaches.map((approach, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    
                    <Box>
                    <Typography variant="h6" component="h3" sx={{fontSize:'1.2rem', fontWeight:'bold'}} gutterBottom>
                        {approach.title}
                      </Typography>
                      <Typography variant="body2">
                        {approach.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <a href='#management-form'>
            <CustomButton
              sx={{ mt: 3, width:150 }}
            >
              Send Message
            </CustomButton>
            </a>
          </Grid>
        </Grid>
        
        <Box sx={{ my: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6.2}>
              <AnimatedWrapper animation='fadeIn'>
              <Box 
                component="img" 
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481142/img_1_o7rnja.png" 
                alt="Lekki-Ikoyi Link Bridge" 
                sx={{ 
                  width: '100%', 
                  height: '600px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  //boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }} 
              />
              </AnimatedWrapper>
            </Grid>
            
            <Grid item xs={12} md={5.8}>
              <Typography variant="h4" component="h3" gutterBottom>
                Start your hassle-free property management journey today
              </Typography>
              <Box component='section' id='management-form'>
              <PropertyManagementForm />
              </Box>
            </Grid>
          </Grid>
        </Box>
        
       <Testimonials />
      </Container>
    </Box>
  )
}

export default PropertyManagement

