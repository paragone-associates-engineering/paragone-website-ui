import { Box, Container } from "@mui/material";
import { partners } from "../constant";
import SectionTitle from "./section-title";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
const OurPartners = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 4,
        backgroundColor: "background.paper",
        overflow: "hidden",
        mt:30,
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle title="Our partners" subtitle="Partners" centered={true} marginBottom={2} />
        <Swiper
          spaceBetween={20} 
          slidesPerView="auto" 
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay enabled
          loop={true} 
          modules={[Autoplay]}
        >
          {partners.map((partner, idx) => (
            <SwiperSlide key={idx} style={{ width: "auto" }}>
              <Box
                component="img"
                src={partner.logo}
                alt={partner.name}
                sx={{
                  height: 120,
                  width: "auto",
                  filter: "grayscale(20%)",
                  opacity: 0.9,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "90vw",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              width: "80px",
              height: "100%",
              zIndex: 2,
              pointerEvents: "none",
            },

            "&::before": {
              left: 0,
              background: "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
              display:{xs:"block", md:"none"}
            },

            "&::after": {
              right: 0,
              background: "linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
              display:{xs:"block", md:"none"}
            },
          }}
        >
          {/* Wrapper for partners logos 
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexWrap: "nowrap",
              minWidth: "100%",
              overflowX: "auto", 
    scrollSnapType: "x mandatory", 
    scrollbarWidth: "none", 
    "&::-webkit-scrollbar": { display: "none" },
  
              "@media (max-width: 768px)": {
                animation: "scroll 16s linear infinite",
              },
              "@keyframes scroll": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },
            }}
          >
            {[...partners, ...partners].map((partner, idx) => (
              <Box
                key={idx}
                component="img"
                src={partner.logo}
                alt={partner.name}
                sx={{
                  height: 120,
                  width: "auto",
                  filter: "grayscale(20%)",
                  opacity: 0.9,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              />
            ))}
          </Box>
        </Box> */}
      </Container>
    </Box>
  );
};

export default OurPartners;
