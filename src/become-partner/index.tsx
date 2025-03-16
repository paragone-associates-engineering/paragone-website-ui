"use client"
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material"
import Testimonials from "../common/testimonial";
import { PageBanner } from '../common/banner/page-banner';
import CustomButton from "../common/button";

const PartnerWithUs = () => {

  return (
    <Box sx={{width:'100vw'}}>
  <PageBanner title='Become A Partner' currentPage="become a partner" />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879065/breno-assis-r3WAWU5Fi5Q-unsplash_1_ewikcd.png"
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
              Selling your home with us
            </Typography>
            <Typography variant="body1" paragraph>
              Selling your property should be a rewarding opportunity to maximize your investment, not a stressful
              ordeal. Our marketing strategies are crafted to present your property in its best light, attracting
              qualified buyers promptly.
            </Typography>
            <Typography variant="body1" paragraph>
              With Paragone Signature & Associates Ltd, benefit from our extensive network and market expertise,
              ensuring you achieve the best price for your property with minimal effort.
            </Typography>
            <Typography variant="body1">
              We conduct thorough market analysis to competitively price your property while optimizing its market
              value. Our staging services enhance your property's appeal, making it stand out to prospective buyers. We
              also manage negotiations and legal formalities, guaranteeing a smooth process.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ my: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0.8}
                sx={{p:4, height: "100%", borderRadius: 2, borderWidth:1.5,borderStyle: "solid", borderColor: "secondary.main", textAlign:"center" }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879005/fi_4207230_vugccm.svg"
                    alt="Aerial view of residential neighborhood"
                  />
                    
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Expertise and Experience
                </Typography>
                <Typography variant="body2">
                  Our team of seasoned professionals brings extensive knowledge of the local market, ensuring accurate
                  property valuations and effective selling strategies.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0.8}
                sx={{p:4, height: "100%", borderRadius: 2, borderWidth:1.5,borderStyle: "solid", borderColor: "secondary.main", textAlign:"center" }}
                //sx={{ p: 4, height: "100%", borderRadius: 2, backgroundColor: "background.paper", textAlign: "center" }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                  component="img"
                  src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879008/fi_9942457_mxdkal.svg"
                  alt=" Comprehensive Marketing"
                    
                  />
                   
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Comprehensive Marketing
                </Typography>
                <Typography variant="body2">
                  We leverage innovative marketing techniques, including digital advertising, social media, and
                  professional photography, to maximize property visibility and attract qualified buyers.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{p:4, height: "100%", borderRadius: 2, borderWidth:1.5,borderStyle: "solid", borderColor: "secondary.main", textAlign:"center" }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                   component="img"
                   src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879003/fi_2252184_sxngjz.svg"
                   alt=" Seamless Transactions"
                    
                  />
                    
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Seamless Transactions
                </Typography>
                <Typography variant="body2">
                  We handle all aspects of the sale, from initial listing to closing, ensuring a smooth and stress-free
                  experience for home sellers and developers.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        </Container>

        <Box sx={{ my: 6, py:10, bgcolor:"secondary.main" }}>
            <Container maxWidth='md'>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card elevation={0.8} sx={{ height: "100%", borderRadius: 2, borderWidth:1.5,borderStyle: "solid", borderColor: "secondary.main" }}>
                <CardContent sx={{ px: 3, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box
                      component="img"
                      src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879000/fi_2475225_kctjlt.svg"
                      alt="Individual seller"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Sell as an individual
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Unlock your property's value with Paragone Signature and enjoy a seamless experience.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                <CustomButton sx={{py:1, px:5}}> Get Started </CustomButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={0.8} sx={{ height: "100%", borderRadius: 2, borderWidth:1.5,borderStyle: "solid", borderColor: "secondary.main" }}>
                <CardContent sx={{ px: 3, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box
                      component="img"
                      src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741878997/fi_993854_a7pzuk.svg"
                      alt="Company seller"
                      sx={{
                        width: 80,
                        height: 80,
                      }}
                    />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Sell as a company
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Give your developments more exposure and reach with Paragone Signature to achieve superior results
                    through our marketing and extensive network.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                    <CustomButton sx={{py:1, px:5}}> Get Started </CustomButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          </Container>
        </Box>
<Container maxWidth='lg'>
       <Testimonials />
      </Container>
    </Box>
  )
}

export default PartnerWithUs

