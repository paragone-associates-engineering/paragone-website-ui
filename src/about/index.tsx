import { Box, Grid, Typography, Container, Card, CardContent } from '@mui/material';
import { PageBanner } from '../common/banner/page-banner';
import Testimonials from '../common/testimonial';
import OurPartners from '../common/partners';
import OurServices from '../common/our-services';

const AboutUs = () => {
    return (
      <Box sx={{width:'100vw'}}>
        <PageBanner 
          title="About Us" 
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
          
        />
        <Container maxWidth="lg" sx={{ pt: 6 }}>
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
            <Typography variant="body1" color='textSecondary' paragraph>
            <span style={{fontWeight:700}}>Paragone Signature & Associates Ltd.</span> is a real estate brokerage and property management company on a mission to create desirous value from one sector of the real estate value chain to the other. 

            </Typography>
            <Typography variant="body1" color='textSecondary' paragraph>
            We transform your real estate journey into a seamless, stress-free experience. Whether you're purchasing, selling, or managing properties, we handle the heavy lifting so you can focus on what truly matters.
            </Typography>
            <Typography variant="body1" color='textSecondary'>
            Our specialists are committed to delivering unparalleled service, ensuring every aspect of your real estate transaction is managed meticulously and professionally.

            </Typography>
          </Grid>
        </Grid>
        <Box>
        <Container maxWidth='lg'>
        <Card sx={{ 
      bgcolor: 'secondary.main', 
      mt:8,
      mx:0,
      position: 'relative', 
      p:{xs:0, sm:2},
      borderRadius:6, 
    }}>
      <CardContent>
       
        <Box 
          component='img'
          src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742661700/Vector_k89r5o.svg'
          alt='quote'
          sx={{ 
            position: 'absolute', 
            top: {xs:15, sm:40}, 
            zIndex:1,
            width:35,
            left: 10, 
            color: '#FFE082', 
            fontFamily: 'serif' 
          }}
        />
        

        <Box sx={{position:'relative', zIndex:3, mx:{xs: 0, md: 6}, mt: 4, mb: 2 }}>
          <Typography variant="h6" component="p" sx={{ color: '#555', fontWeight:300, mb: 3, fontSize:'1.1rem' }}>
            The real estate experience of our clients should be stress-free and
            rewarding hence our commitment to transform real estate challenges
            into opportunities, delivering exceptional service from start to finish.
          </Typography>
          
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ color: '#FFA000', fontWeight: 'bold' }}>
              Emmanuel John
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Chief Executive Officer
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Paragone Signature & Associates Ltd.
            </Typography>
          </Box>
        </Box>

        <Box 
          component='img'
          src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742661698/Vector_1_dhp2n1.svg'
          alt='quote'
          sx={{ 
            position: 'absolute', 
            bottom: 150, 
            right: 20, 
            width:35,
            color: '#FFE082', 
            fontFamily: 'serif' 
          }}
        />
         
      </CardContent>
    </Card>
    </Container>
</Box>
<Box sx={{mt:8}}>
        <OurPartners />
        </Box>
        <Container maxWidth='md'>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Card sx={{ height: '100%'}}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
      
          <Box 
            component="img"
            src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742661696/fi_1436588_erkna1.svg'
            alt='our vision'
            sx={{ width: 80, height: 80 }}
          
          />
       
        
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
          Our vision
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#555' }}>
          To be the most innovative and reliable Real Estate Brokerage Firm in Nigeria with
          cutting-edge global standards and delivery.
        </Typography>
      </CardContent>
    </Card>
</Grid>

<Grid item xs={12} sm={6}>
        <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box 
            component="img"
            src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742661691/fi_10301342_eursm3.svg'
            alt='core values'
            sx={{ width: 80, height: 80 }}
           
          />
           
          
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
            Core values
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
            Professionalism
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
            - We are committed to adhering to the best operational standard in delivery and representation.
          </Typography>
          
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
            Innovation
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
            - We inspire and deliberately find better ways of creating and attracting value.
          </Typography>
          
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
            Excellence
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            - We stand out and demand the best.
          </Typography>
        </Box>
      </CardContent>
    </Card>
</Grid>
</Grid>
</Container>
        <OurServices />

        <Testimonials />
        </ Container >
      </Box>
    );
  };
  
  export default AboutUs;