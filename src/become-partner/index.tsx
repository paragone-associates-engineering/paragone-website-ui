'use client';
import { Container, Typography, Box, Grid, Paper, Card, CardContent, CardActions } from '@mui/material';
import Testimonials from '../common/testimonial';
import { PageBanner } from '../common/banner/page-banner';
import CustomButton from '../common/button';
import { ContactFormModal } from './components/individual-modal';
import { AnimatedWrapper } from '../common/animations/animated-wrapper';
import { Helmet } from 'react-helmet-async';

const PartnerWithUs = () => {
  return (
    <>
      <Helmet>
        <title>Partner With Us | Paragone Signature & Associates</title>
        <meta
          name="description"
          content="Selling your property should be an opportunity to maximize your investment, not a stressful ordeal. Our marketing strategies are crafted to present your property in its best light, attracting qualified Buyers promptly."
        />
      </Helmet>

      <Box sx={{ width: '100vw' }}>
        <PageBanner title="Become A Partner" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Partner With Us' }]} />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <AnimatedWrapper animation="slideLeft">
                <Box
                  component="img"
                  src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879065/breno-assis-r3WAWU5Fi5Q-unsplash_1_ewikcd.png"
                  alt="Aerial view of residential neighborhood"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
              </AnimatedWrapper>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedWrapper>
                <Typography variant="h3" marginBottom={2} component="h1" gutterBottom>
                  Selling your home with us
                </Typography>
                <Typography variant="body1" marginBottom={2} fontWeight={600} color="text.secondary">
                  Selling your property should be an opportunity to maximize your investment, not a stressful ordeal. Our marketing
                  strategies are crafted to present your property in its best light, attracting qualified Buyers promptly.
                </Typography>
                <Typography variant="body1" marginBottom={2} color="text.secondary">
                  With <span style={{ fontWeight: 600 }}> Paragone Signature & Associates,</span> benefit from our extensive network and
                  market expertise, ensuring you achieve the best price for your property with minimal effort.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We conduct thorough market analyses to competitively price your property while optimizing its market value. Our staging
                  services enhance your property's appeal, making it stand out to prospective buyers. We also manage negotiations and legal
                  formalities, guaranteeing a seamless and successful transaction.
                </Typography>
              </AnimatedWrapper>
            </Grid>
          </Grid>

          <Box sx={{ my: 8, maxWidth: { sm: 600, md: '100%' } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    borderWidth: 1.5,
                    borderStyle: 'solid',
                    borderColor: 'secondary.main',
                    textAlign: 'center',
                  }}
                >
                  <AnimatedWrapper>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
                      Our team of seasoned professionals brings extensive knowledge of the local market, ensuring accurate property
                      valuations and effective selling strategies.
                    </Typography>
                  </AnimatedWrapper>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    borderWidth: 1.5,
                    borderStyle: 'solid',
                    borderColor: 'secondary.main',
                    textAlign: 'center',
                  }}
                  //sx={{ p: 4, height: "100%", borderRadius: 2, backgroundColor: "background.paper", textAlign: "center" }}
                >
                  <AnimatedWrapper>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
                      We leverage innovative marketing techniques, including digital advertising, social media, and professional
                      photography, to maximize property visibility and attract qualified buyers.
                    </Typography>
                  </AnimatedWrapper>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    borderWidth: 1.5,
                    borderStyle: 'solid',
                    borderColor: 'secondary.main',
                    textAlign: 'center',
                  }}
                >
                  <AnimatedWrapper>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
                      We handle all aspects of the sale, from initial listing to closing, ensuring a smooth and stress-free experience for
                      home sellers and developers.
                    </Typography>
                  </AnimatedWrapper>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Box sx={{ my: 6, py: 10, bgcolor: 'secondary.main' }}>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <AnimatedWrapper>
                  <Card
                    elevation={0}
                    sx={{ height: '100%', borderRadius: 2, borderWidth: 1.5, borderStyle: 'solid', borderColor: 'secondary.main' }}
                  >
                    <CardContent sx={{ px: 3, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Box
                          component="img"
                          src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741879000/fi_2475225_kctjlt.svg"
                          alt="Individual seller"
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            objectFit: 'cover',
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
                    <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                      <ContactFormModal />
                    </CardActions>
                  </Card>
                </AnimatedWrapper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <AnimatedWrapper>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      maxHeight: { lg: '320px' },
                      borderRadius: 2,
                      borderWidth: 1.5,
                      borderStyle: 'solid',
                      borderColor: 'secondary.main',
                    }}
                  >
                    <CardContent sx={{ flex: 1, px: 3, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
                        Give your developments more exposure and reach with Paragone Signature to achieve superior results through our
                        marketing and extensive network.
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 3, mt: '-17px' }}>
                      <CustomButton sx={{ py: 1, px: 5 }} href="/sell-as-a-company">
                        {' '}
                        Get Started{' '}
                      </CustomButton>
                    </CardActions>
                  </Card>
                </AnimatedWrapper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Testimonials />
      </Box>
    </>
  );
};

export default PartnerWithUs;
