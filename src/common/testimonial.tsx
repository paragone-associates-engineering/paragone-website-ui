import React,{useState, useEffect} from 'react';
import { 
  Box, 
  Container,
  Typography, 
  Card, 
  CardContent, 
  Avatar,
  Rating,
  Stack,
  Divider
} from '@mui/material';

import { Star } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import SectionTitle from './section-title';
import axios from 'axios';
import { API_BASE_URL } from "../services/api";
import SkeletonLoader from "./skeleton-loader";
interface TestimonialData {
  id: number;
  title:string;
  testifierName: string;
  testifierOccupation: string;
  content: string;
  rating: number;
  avatar?: string;
}


interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  
  return (
    
    <Card 
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
       // overflow: '',
        border:1,
        borderColor:'divider',
        minHeight:320,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ p: 4, flexGrow: 1 }}>
        <Typography 
          variant="h5" 
          component="h2"
          sx={{ 
            fontWeight: 'bold',
            mb: 2
          }}
        >
         {testimonial?.title}
        </Typography>
        
        <Box
        component='img'
        src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474446/quotation_wknw2h.svg'
        alt='quote icon'
          sx={{ 
            position: 'absolute',
            top: 50,
            right: 24,
            color: '#f1f1f5',
            width:60,
            height:60,
            objectFit:'contain'
          }}
        />
          {/* <FormatQuoteIcon sx={{ fontSize: 80, transform: 'rotate(180deg)' }} />
        </Box> */}
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ mb: 2, position: 'relative', zIndex: 1 }}
        >
          {testimonial?.content}
        </Typography>
        
        <Rating 
          value={testimonial?.rating} 
          readOnly 
          sx={{ 
            mb: 3,
            mx:0, 
            '& .MuiRating-iconFilled': {
              color: '#FFA41C'
            }
          }} 
        />
        
        <Box 
          sx={{ 
            height: 1, 
            backgroundColor: '#e0e0e0', 
            
          }} 
        />
         <Divider sx={{ my: 2 }} />
        <Stack 
          direction="row" 
          spacing={2}
          alignItems="center"
          justifyContent='space-between'
        >
          <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
          <Avatar 
            sx={{ width: 40, height: 40, bgcolor:'primary.main' }}
          >{testimonial?.testifierName.split(' ')[0][0]}</Avatar>
          <Box>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ fontWeight: 'medium' }}
            >
              {testimonial?.testifierName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonial?.testifierOccupation}
            </Typography>
          </Box>
          </Box>
          
          <Box 
          component="img"
          src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474450/devicon-plain_google_ot2t2o.svg"
          alt="Google"
          sx={{ ml: 'auto', width: 30, height: 30 }}
          />
           
        </Stack>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
 // const theme = useTheme();
 const [reviews, setReviews] = useState([]);
   const [isLoading, setIsLoading] = useState(false)
    const fetchReviews = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`${API_BASE_URL}/gsuite/get-reviews`);
        //console.log(response.data)
        setReviews(response.data.results)
      }catch(err) {
       console.error(err)
      }finally{
        setIsLoading(false)
      }
    }

    useEffect(() => {
      fetchReviews()
    },[])

  return (
    <Box component="section" sx={{ pt: 6, minHeight:'300px' }}>
    <Container maxWidth="lg">
      <SectionTitle
      subtitle='Testimonials'
        title="Our customers say it better about us"
        centered={true}
        marginBottom={3}
      />

      <Box sx={{  mb: 5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent:'center',
            gap:0.5, 
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741310023/image_70_bcfgqo.png"
            alt="Google"
            sx={{ height: 34, width: 34 }}
          />
          <Stack> 
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            GOOGLE
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
          <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 700 }}>4.9</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap:0 }}>
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
              </Box>
          </Box>
          </Stack>
        </Box>
       
      </Box>
    <Box sx={{ maxWidth: {xs:'100%', md:1200}, mx: 'auto', p: 2, mb:3 }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={false}
        pagination={{
          clickable: true,
         // el: '.swiper-custom-pagination',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="testimonial-swiper"
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#ddd",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-width": "15px",
          "--swiper-pagination-bullet-height": "8px",
          "--swiper-pagination-border-radius": "3px",
          "--swiper-pagination-bullet-horizontal-gap": "5px"
        } as React.CSSProperties} >
         
        {isLoading ? (
          <Box >
            <SkeletonLoader count={3} />
            </Box>
        ) : (
          reviews.map((testimonial: TestimonialData) => (
          <SwiperSlide key={testimonial?.id}>
            <Box sx={{ height: '100%' }}>
              <TestimonialCard testimonial={testimonial} />
            </Box>
          </SwiperSlide>
       )
      )
       )}
      </Swiper>
      {/* <div className="swiper-custom-pagination"></div> */}
    </Box>
    </Container>
    </Box>
  ); 
};

export default Testimonials;