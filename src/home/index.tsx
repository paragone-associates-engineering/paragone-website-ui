"use client"

import { Box, Container, Grid, Card, useTheme } from "@mui/material"
import ServiceCard from "../common/service-card"
import SectionTitle from "../common/section-title"

import { HomeBanner } from "../common/banner/home-banner"
import PromotionBanners from "../common/banner/promotions"
import ExclusiveProperties from "../common/exclusive-properties"
import OurPartners from "../common/partners"
import Testimonials from "../common/testimonial"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/store"
import { fetchBlogPosts } from "../redux/slices/blog-slice"
import { useEffect } from "react"
import { BlogCard } from "../common/blog-card"
import OurServices from "../common/our-services"
import SkeletonLoader from "../common/skeleton-loader"
import ResourcesSection from "./resources-section"

const Home = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading } = useSelector((state: RootState) => state.blog)
  const page = 1

  useEffect(() => {
    dispatch(fetchBlogPosts(page))
  }, [dispatch, page])

  return (
    <Box sx={{ width: "100vw" }}>
      <HomeBanner />

      <Box component="section" sx={{ display: "block", pt: 6, pb: 8 }}>
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
                description="We offer expert real estate brokerage services, guiding you through buying, selling, and leasing properties with professional, personalized assistance to achieve your real estate goals."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274361/fi_3526159_pmvmt1.svg"
                actionText="Learn More"
                actionLink="/real-estate-brokerage"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ServiceCard
                title="Property Management"
                description="We care for your property as if it were our own. Our management services include fostering tenant relationships, ensuring financial oversight, and maximizing your property's value and optimal returns."
                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274243/fi_9202615_xqsik3.svg"
                actionText="Learn More"
                actionLink="/property-management"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          backgroundColor: "secondary.main",
          py: 5,
          border: `1px solid ${theme.palette.background.paper}`,
        }}
      >
        <ExclusiveProperties />
      </Box>

      <Box component="section" sx={{ py: posts.length > 0 ? 0 : -10 }}>
        <Container maxWidth="lg">
          {/* First promotional banner - TOP location */}
          <PromotionBanners location="top" autoplayDelay={5000} />
        </Container>
      </Box>

      <OurServices />

      {/* Blog Section */}
      {posts?.length > 0 && (
        <Box
          component="section"
          sx={{
            pt: 0,
            backgroundColor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <SectionTitle
              title="Get updates from our latest real estate insights"
              subtitle="News and blog"
              centered={true}
              marginBottom={5}
            />

            {loading ? (
              <SkeletonLoader count={3} />
            ) : (
              <Grid container spacing={2}>
                {posts.slice(0, 3).map((post) => (
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
                      <BlogCard post={post} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      )}
<ResourcesSection/>
      <Container maxWidth="lg" sx={{mt:8}}>
        {/* Second promotional banner - BOTTOM location */}
        <PromotionBanners location="bottom" autoplayDelay={5000} />
      </Container>

      <Testimonials />
      <OurPartners />
    </Box>
  )
}

export default Home
