import { Box, Grid, Typography, Container } from '@mui/material';
import { PageBanner } from '../common/banner/page-banner';
import Testimonials from '../common/testimonial';
import OurPartners from '../common/partners';
import OurServices from '../common/our-services';

const AboutUs = () => {
    return (
      <Box sx={{width:'100vw'}}>
        <PageBanner 
          title="About Us" 
          currentPage="About us"
          
        />
        <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741895273/james-sullivan-ESZRBtkQ_f8-unsplash_1_izswww.png"
              alt="Aerial view of residential neighborhood"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
            Who we are
            </Typography>
            <Typography variant="body1" paragraph>
            Paragone Signature & Associates Ltd. is a real estate brokerage and property management company on a mission to create desirous value from one sector of the real estate value chain to the other. 

            </Typography>
            <Typography variant="body1" paragraph>
            We transform your real estate journey into a seamless, stress-free experience. Whether you're purchasing, selling, or managing properties, we handle the heavy lifting so you can focus on what truly matters.
            </Typography>
            <Typography variant="body1">
            Our specialists are committed to delivering unparalleled service, ensuring every aspect of your real estate transaction is managed meticulously and professionally.

            </Typography>
          </Grid>
        </Grid>
        <OurPartners />
        <OurServices />
        <Testimonials />
        </ Container >
      </Box>
    );
  };
  
  export default AboutUs;