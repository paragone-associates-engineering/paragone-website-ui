
import { Box, Container, Grid, Grid2,Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import ServiceCard from '../common/service-card';
import SectionTitle from '../common/section-title';

import { HomeBanner } from '../common/banner/home-banner';
import PromotionBanners from '../common/banner/promotions';
import ExclusiveProperties from '../common/exclusive-properties';
import OurPartners from '../common/partners';
import Testimonials from '../common/testimonial';

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{width:'100vw'}} > 
    <HomeBanner />
      
      <Box component="section" sx={{display:'block', pt:6, pb:8 }}>
        <Container maxWidth="md">
          <SectionTitle
            title="Our services are tailored to meet your real estate needs"
            description="Discover how our tailored real estate brokerage and property management service can help you effortlessly buy, sell, and manage properties"
            centered={true}
            marginBottom={6}
          />
         

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <ServiceCard
                title="Real Estate Brokerage"
                description="We connect buyers with their dream properties and help sellers get the best value for their real estate assets."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274361/fi_3526159_pmvmt1.svg"
                //icon={<Business sx={{ width: 56, height: 56, color: theme.palette.primary.main }} />}
                actionText="Learn More"
                actionLink="/real-estate-brokerage"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ServiceCard
                title="Property Management"
                description="Our comprehensive management services take the stress out of owning rental properties and maximize your returns."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274243/fi_9202615_xqsik3.svg"
                actionText="Learn More"
                actionVariant='outline'
                actionLink="/property-management"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

     
      <Box 
        component="section" 
        sx={{ 
          backgroundColor: 'secondary.main', 
         py: 5,
          border: `1px solid ${theme.palette.background.paper}`,
        }}
      >
        

<ExclusiveProperties />
        
      </Box>

     
      <Box component="section" sx={{ py: 5 }}>
        <Container maxWidth="lg">
            <PromotionBanners imageSrc='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741265788/image_203_fo6jz2.png' />
        </Container>
      </Box>

      
      <Box component="section" sx={{ py: 5 }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="How our clients get benefited by us"
            subtitle="THE BENEFITS"
            description="We strive to provide value at every step of your real estate journey"
            centered={true}
            marginBottom={6}
          />

          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <ServiceCard
                title="Buy a property"
                description="Find your dream home with our extensive listings and expert buying agents to guide you through the process."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276451/fi_7374059_k6kuhg.svg"
                actionText="Learn More"
                actionLink="/services/buy"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ServiceCard
                title="Sell a property"
                description="Get the best value for your property with our market expertise, professional marketing, and negotiation skills."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274361/fi_3526159_pmvmt1.svg"
                actionText="Learn More"
                actionLink="/services/sell"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ServiceCard
                title="Manage a property"
                description="Let us handle the day-to-day operations of your rental properties while you enjoy a steady income stream."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276444/fi_6684167_knrmez.svg"
                actionText="Learn More"
                actionLink="/services/manage"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Blog Section */}
      <Box 
        component="section" 
        sx={{ 
          py: 8,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <SectionTitle
            title="Get updates from our latest real estate insights"
            centered={true}
            marginBottom={6}
          />

          <Grid2 container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
            {/* Blog post cards */}
            {[1, 2, 3].map((item) => (
              <Grid2 size={{ xs:12,sm:4}} key={item}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box 
                    component="img"
                    src={`https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276751/Copy_of_SPH_5744_1_hybb4f.png`}
                    alt={`Blog post ${item}`}
                    sx={{ 
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3,
                      }}
                    >
                      {item === 1 
                        ? 'Top 10 Neighborhoods to Invest in 2023' 
                        : item === 2 
                          ? 'How to Prepare Your Home for a Quick Sale' 
                          : 'Understanding the Current Real Estate Market Trends'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item === 1 
                        ? 'Discover the most promising neighborhoods for real estate investment this year, with data-backed insights and expert recommendations.' 
                        : item === 2 
                          ? 'Learn the essential steps to prepare your property for the market and attract serious buyers quickly.' 
                          : 'Get an in-depth analysis of current market conditions and what they mean for buyers and sellers.'}
                    </Typography>
                    <Button
                      color="primary"
                      endIcon={<ArrowForward fontSize="small" />}
                      sx={{
                        fontWeight: 600,
                        p: 0,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          <PromotionBanners imageSrc='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741265788/image_201_1_lurq5f.png' />
        </Container>
      </Box>

          <Testimonials />

      <OurPartners />
    </Box>
  );
};

export default Home;