
import { Box, Container, Grid, Typography, Card, useTheme } from '@mui/material';
import ServiceCard from '../common/service-card';
import SectionTitle from '../common/section-title';

import { HomeBanner } from '../common/banner/home-banner';
import PromotionBanners from '../common/banner/promotions';
import ExclusiveProperties from '../common/exclusive-properties';
import OurPartners from '../common/partners';
import Testimonials from '../common/testimonial';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { fetchBlogPosts } from '../redux/slices/blog-slice';
import { useEffect } from 'react';
import { BlogCard } from '../common/blog-card';

const Home = () => {
  const theme = useTheme();
   const dispatch = useDispatch<AppDispatch>();
    const { posts,  loading } = useSelector((state: RootState) => state.blog);
   const page = 1;  
    useEffect(() => {
      dispatch(fetchBlogPosts(page));
    }, [dispatch, page]);

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

{loading ? (
          <Typography>Loading...</Typography>
        ) : (

            <Grid container spacing={4}>
              {posts.slice(0,3).map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                    component={Link}
                    to={`/blog/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <BlogCard post={post}/>
                  </Card>
                </Grid>
              ))}
            </Grid>
        )}

          <PromotionBanners imageSrc='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741265788/image_201_1_lurq5f.png' />
        </Container>
      </Box>

          <Testimonials />

      <OurPartners />
    </Box>
  );
};

export default Home;

  {/* <Typography variant="h4" component="h2" gutterBottom>
              Latest Posts
            </Typography> */}