import { 
  Box, 
  Container, 
  Grid, 
  Typography
} from '@mui/material';
import { Star } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import SectionTitle from './section-title';
import ServiceCard from './service-card';
import { AnimatedWrapper } from './animations/animated-wrapper';
import { TestimonialData } from './testimonial';
import { API_BASE_URL } from "../services/api";

const OurServices = () => {
    const [reviews, setReviews] = useState([]);    
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchReviews = async() => {       
        setIsLoading(true);
        try{         
            const response = await axios.get(`${API_BASE_URL}/gsuite/get-reviews`);         
            setReviews(response.data.results);
        } catch(err) {        
            console.error(err);
        } finally{         
            setIsLoading(false);
        }    
    };
    
    useEffect(() => {       
        fetchReviews();
    }, []);

    
    return (
        <Box component="section" sx={{ py: 5 }}>
            <Container maxWidth="lg">
                <AnimatedWrapper>
                    <SectionTitle
                        title="How our clients get benefited by us"
                        subtitle="Our Services"
                        centered={true}
                        marginBottom={3}
                    />
                    
                    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", gap: 1 }}>
                        
                        <Box sx={{ width: '100%', maxWidth: 600, mb: 2 }}>
                            {!isLoading && reviews?.length > 0 ? (
                                <Swiper
                                    modules={[EffectFade, Autoplay]}
                                    effect="fade"
                                    fadeEffect={{
                                        crossFade: true
                                    }}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    speed={800}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                >
                                    {reviews.map((review: TestimonialData, index) => (
                                        <SwiperSlide key={index}>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    backgroundColor: "#F4F4F4", 
                                                    padding: 2,
                                                    textAlign: 'center',
                                                    borderRadius: 1,
                                                    minHeight: 30,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                "{review?.content?.substring(0, 160) + (review?.content?.length > 160 ? '...' : '')}"
                                            </Typography>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        backgroundColor: "#F4F4F4", 
                                        padding: 2,
                                        textAlign: 'center',
                                        borderRadius: 1,
                                        minHeight: 60,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    "Outstanding service, bought my dream home quickly"
                                </Typography>
                            )}
                        </Box>
                        
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", gap: 0.1 }} marginBottom={4}>
                            <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Star sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600 }}>
                               4.9 <span style={{fontWeight: "400", opacity: 0.8}}>
                                    ({reviews?.length > 0 ? reviews?.length?.toLocaleString() : '128'})
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Grid container spacing={4} sx={{MaxWidth:{sm:600,md:'100%'}}}>
                        <Grid item xs={12} md={4}>
                            <ServiceCard
                                title="Buy a property"
                                description="Find your dream home with our extensive listings and expert buying agents to guide you through the process."
                                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276451/fi_7374059_k6kuhg.svg"
                                actionText="Learn More"
                                actionLink="/listings"
                                //actionVariant="outline"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ServiceCard
                                title="Sell a property"
                                description="Get the best value for your property with our market expertise, professional marketing, and negotiation skills."
                                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741274361/fi_3526159_pmvmt1.svg"
                                actionText="Learn More"
                                actionLink="/partner-with-us"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ServiceCard
                                title="Manage a property"
                                description="Let us handle the day-to-day operations of your rental properties while you you enjoy a steady income stream."
                                imageSrc="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741276444/fi_6684167_knrmez.svg"
                                actionText="Learn More"
                                actionLink="/property-management"
                                //actionVariant="outline"
                            />
                        </Grid>
                    </Grid>
                </AnimatedWrapper>
            </Container>
        </Box>
    )
}

export default OurServices