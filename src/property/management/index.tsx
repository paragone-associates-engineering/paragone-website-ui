import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  //type SelectChangeEvent,
} from "@mui/material";
import Testimonials from "../../common/testimonial";
import { PageBanner } from "../../common/banner/page-banner";
import { approaches, services } from "../data";
//import { ManagementFormData } from "../types";
import PropertyManagementForm from "./form";

const PropertyManagement = () => {

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Property Management' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Property Management" }]} />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481159/new-home-keys-plan-table-with-defocused-couple_1_kper2m.png" 
              alt="Property management team" 
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Hassle-Free Property Ownership, Maximum Returns
            </Typography>
            <Typography variant="body1" paragraph>
              Discovering and managing properties should be an exhilarating endeavor, not a burdensome task. Paragone Signature & Associates Ltd. aids you in finding properties that fit your investment goals and managing them effectively. We handle all aspects of property management, from tenant screening to maintenance, ensuring your investment income flows hassle-free. Enjoy the benefits of property ownership without the daily headaches.
            </Typography>
            <Typography variant="body1">
              Our property management services are designed to optimize your investment's value while minimizing your workload. We support through tenant screening to ensure reliable tenants, regular maintenance to preserve property value, and efficient rent collection to keep your property in prime condition.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center" sx={{ my: 8 }}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Approach
            </Typography>
            
            <Grid container spacing={3}>
              {services.map((approach, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom>
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
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Learn more
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>
        
        <Grid container spacing={6} alignItems="center" sx={{ my: 8 }}>
          <Grid item xs={12} md={6}>
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
                      <Typography variant="h6" component="h3" gutterBottom>
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
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Learn more
            </Button>
          </Grid>
        </Grid>
        
        <Box sx={{ my: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box 
                component="img" 
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481142/img_1_o7rnja.png" 
                alt="Lekki-Ikoyi Link Bridge" 
                sx={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                  //boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }} 
              />
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" gutterBottom>
                Start your hassle-free property management journey today
              </Typography>
              
              <PropertyManagementForm />
              
            </Grid>
          </Grid>
        </Box>
        
       <Testimonials />
      </Container>
    </Box>
  )
}

export default PropertyManagement

