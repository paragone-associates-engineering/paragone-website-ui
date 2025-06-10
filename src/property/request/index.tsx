
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,

} from "@mui/material"
import { PageBanner } from '../../common/banner/page-banner';
import Testimonials from '../../common/testimonial';
import RequestForm from "./form";
import { AnimatedWrapper } from "../../common/animations/animated-wrapper";

const PropertyRequest = () => {
  return (
    <Box  sx={{width:'100vw'}}>
     <PageBanner 
         title="Property Request" 
         breadcrumbs={[{ label: "Home", href: "/" }, { label: "Property Request" }]} />
     

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <AnimatedWrapper animation="slideLeft">
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741867698/microsoft-edge-_eCnLJWQXMg-unsplash_1_dmpqrj.png"
              alt="Person searching for property"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
            </AnimatedWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimatedWrapper>
            <Typography variant="h3" component="h1" gutterBottom>
              Find Your Perfect Property with Paragóne Signature & Associates
            </Typography>
            <Typography variant="body1" paragraph>
              We understand that finding the perfect property requires a personalized approach. Whether you're seeking a
              luxury residence, a prime commercial space, or a unique investment opportunity, our dedicated team is here
              to help.
            </Typography>
            <Typography variant="body1" paragraph>
              Our experienced professionals work diligently to match you with properties that meet your specific needs
              and preferences drawing from our access to an extensive range of properties across Nigeria.
            </Typography>
            <Typography variant="body1">
              Let us take the stress out of your property search and guide you towards finding your ideal property with
              Paragóne Signature & Associates Ltd. Your journey to the perfect property starts here.
            </Typography>
            </AnimatedWrapper>
          </Grid>
        </Grid>
        </Container>

        <Box sx={{ py: 8, backgroundColor:"secondary.main" }} >
        <Container maxWidth="md" >
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Request a property
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
            Do you have specific features you require in your property of choice, please leave us a message and we'll
            get across to you with properties matching your preferences.
          </Typography>

          <Paper elevation={0} sx={{ p: 4, backgroundColor: "secondary.main", borderRadius: 2 }}>
            <AnimatedWrapper>
            <RequestForm />
            </AnimatedWrapper>
          </Paper>
          </Container>
        </Box>
       
<Container maxWidth='lg'>
       <Testimonials />
      </Container>
    </Box>
  )
}

export default PropertyRequest

