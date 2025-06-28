
import { useEffect } from "react"
import { Container, Typography, Box, Grid } from "@mui/material"
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { fetchResources } from "../redux/slices/resources-slice"
import ResourceCard from "../resources/components/resource-card"
import ResourceCardSkeleton from "../resources/components/resource-card-skeleton"

import 'swiper/swiper-bundle.css';
import CustomButton from "../common/button"
import SectionTitle from "../common/section-title"

const ResourcesSection = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { resources, loading } = useAppSelector((state) => state.resources)

  useEffect(() => {
    dispatch(fetchResources({ isActive: true }))
  }, [dispatch])

  const handleViewAllResources = () => {
    navigate("/resources")
  }

  
  const featuredResources = resources.slice(0, 8)

  return (
    <Box sx={{ py: 5, bgcolor: "secondary.main", mt:6 }}>
      <Container maxWidth="lg">
         <SectionTitle
         subtitle='Our Resources'
                    title="Resources"
                    description="Access valuable resources, guides, and tools to accelerate your success. From free downloads to exclusive
            content, find everything you need in one place."
                    centered={true}
                    marginBottom={6}
                  />
        {/* <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
            <GetAppIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
             
            >
              Our Resource 
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}>
            Access valuable resources, guides, and tools to accelerate your success. From free downloads to premium
            content, find everything you need in one place.
          </Typography>
         
        </Box> */}

       
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ResourceCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : featuredResources.length > 0 ? (
          <Box sx={{ position: "relative" }}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-resources",
                prevEl: ".swiper-button-prev-resources",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              style={{
                paddingBottom: "50px",
              }}
            >
              {featuredResources.map((resource) => (
                <SwiperSlide key={resource.id}>
                  <ResourceCard resource={resource} showButton={false} />
                </SwiperSlide>
              ))}
            </Swiper>

           
            <Box
              className="swiper-button-prev-resources"
              sx={{
                position: "absolute",
                top: "50%",
                left: -20,
                transform: "translateY(-50%)",
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "white",
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "primary.main",
                  color: "white",
                },
                "&::after": {
                  content: "'‹'",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
                transition: "all 0.3s ease-in-out",
              }}
            />
            <Box
              className="swiper-button-next-resources"
              sx={{
                position: "absolute",
                top: "50%",
                right: -20,
                transform: "translateY(-50%)",
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "white",
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "primary.main",
                  color: "white",
                },
                "&::after": {
                  content: "'›'",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
                transition: "all 0.3s ease-in-out",
              }}
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No resources available at the moment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later for new resources and updates.
            </Typography>
          </Box>
        )}

        <CustomButton
           
            endIcon={ArrowForwardIcon }
            onClick={handleViewAllResources}
            sx={{
              borderRadius: 1,
              px: 4,
              py: 1.5,
               mx: "auto",
               display: "flex",
               transition: "all 0.3s ease-in-out",
            }}
          >
            View All Resources
          </CustomButton>
        
      </Container>
    </Box>
  )
}

export default ResourcesSection
