import { Box, Container, Typography } from "@mui/material";
//import { partners } from "../constant";
import SectionTitle from "./section-title";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from "../services/api";
import SkeletonLoader from "./skeleton-loader";

type Partner = {
  logo: string;
  name: string;
  
};

const OurPartners = () => {
const [partners, setPartners] = useState<Partner[]>([]);
 const [isLoading, setIsLoading] = useState(false)

    const fetchPartners = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`${API_BASE_URL}/partner/get-partners`);
        setPartners(response.data)
      }catch(err) {
       console.error(err)
      }finally{
        setIsLoading(false)
      }
    }

    useEffect(() => {
      fetchPartners()
    },[])
  return (
    <Box
      component="section"
      sx={{
        py: 4,
        backgroundColor: "background.paper",
        overflow: "hidden",
        //mt:30,
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle title="Our partners" subtitle="Partners" centered={true} marginBottom={2} />
        <Swiper
          spaceBetween={10} 
          slidesPerView={2}
          autoplay={{ delay: 3000, disableOnInteraction: false }} 
          loop={true} 
          breakpoints={{
            
          400: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
          modules={[Autoplay]}
        >
          {isLoading ? (
          <Box >
            <SkeletonLoader count={3} />
            </Box>
        ) : (
          partners.map((partner, idx) => (
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
                  borderRadius:4,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              />
            <Typography marginLeft='10px' fontWeight={600}>{partner?.name}</Typography>
            </SwiperSlide>
          )))}
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
