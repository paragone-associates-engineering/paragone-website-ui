import { Box, Container } from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/partner/get-partners`);
      setPartners(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Box
      component="section"
      sx={{
        pt: 4,
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle 
          title="Our partners" 
          subtitle="Partners" 
          centered={true} 
          marginBottom={0} 
        />
        
        {isLoading ? (
          <Box>
            <SkeletonLoader count={3} />
          </Box>
        ) : (
          <Swiper
            modules={[Autoplay]} 
            spaceBetween={20} 
            slidesPerView={1}
            // pagination={{
            //   clickable: true,
            //   dynamicBullets: true,
            // }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            style={{
              paddingBottom: "50px", 
            }}
          >
            {partners.map((partner, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200, 
                  }}
                >
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    sx={{
                      maxHeight: 400,
                      //maxWidth: 400,
                      width: "320px",
                      height: "auto",
                      objectFit: "contain", 
                      // filter: "grayscale(10%)",
                      // opacity: 0.9,
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        filter: "grayscale(0%)",
                        opacity: 1,
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </Box>
  );
};

export default OurPartners;