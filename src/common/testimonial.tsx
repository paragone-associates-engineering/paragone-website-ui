import React from 'react';
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
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Star } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import SectionTitle from './section-title';

interface TestimonialData {
  id: number;
  name: string;
  occupation: string;
  comment: string;
  rating: number;
  avatar: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: 'Michele Philips',
    occupation: 'Doctor',
    comment: 'Veniam commodo do cillum qui culpa duis velit eiusmod ipsum sunt esse laborum. Elit  ut esse aliquip qui proident culpa veniam do est ullamco.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'John Smith',
    occupation: 'Engineer',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,  nec, ultricies sed, dolor.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    occupation: 'Designer',
    comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 4,
    name: 'Robert Davis',
    occupation: 'Marketing Director',
    comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 5,
    name: 'Emily Wilson',
    occupation: 'Project Manager',
    comment: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.',
    rating: 4,
    avatar: 'https://source.unsplash.com/random/100x100/?portrait,woman,3'
  },
  {
    id: 6,
    name: 'Michael Brown',
    occupation: 'Software Developer',
    comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
    rating: 5,
    avatar: 'https://source.unsplash.com/random/100x100/?portrait,man,3'
  }
];

const TestimonialCard: React.FC<{ testimonial: TestimonialData }> = ({ testimonial }) => {
  return (
    
    <Card 
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'visible',
        border:1,
        borderColor:'divider',
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
          Great service
        </Typography>
        
        <Box 
          sx={{ 
            position: 'absolute',
            top: 20,
            right: 24,
            color: '#f1f1f5',
            fontSize: 80
          }}
        >
          <FormatQuoteIcon sx={{ fontSize: 80, transform: 'rotate(180deg)' }} />
        </Box>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ mb: 2, position: 'relative', zIndex: 1 }}
        >
          {testimonial.comment}
        </Typography>
        
        <Rating 
          value={testimonial.rating} 
          readOnly 
          sx={{ 
            mb: 3, 
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
            src={testimonial.avatar}
            alt={testimonial.name}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ fontWeight: 'medium' }}
            >
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonial.occupation}
            </Typography>
          </Box>
          </Box>
          
          <Box 
            sx={{ 
              ml: 'auto', 
              width: 40, 
              height: 40, 
              bgcolor: '#f1f1f5', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '50%',
              color: '#888'
            }}
          >
            G
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
 // const theme = useTheme();

  return (
    <Box component="section" sx={{ py: 8 }}>
    <Container maxWidth="lg">
      <SectionTitle
      subtitle='Testimonials'
        title="Our customers say it better about us"
        centered={true}
        marginBottom={3}
      />

      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Box
          sx={{
            display: 'inline-flex',
            //alignItems: 'center',
            mb: 1,
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741310023/image_70_bcfgqo.png"
            alt="Google"
            sx={{ height: 24, width: 24 }}
          />
          <Stack> 
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            GOOGLE
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
          <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600 }}>4.9</Typography>
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
            <Star sx={{ fontSize: 18, color: '#FFC107' }} />
          </Box>
          </Stack>
        </Box>
       
      </Box>
    <Box sx={{ maxWidth: {xs:'100%', md:1200}, mx: 'auto', p: 2 }}>
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
            slidesPerView: 3,
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
          "--swiper-pagination-bullet-height": "5px",
          "--swiper-pagination-border-radius": "0px",
          "--swiper-pagination-bullet-horizontal-gap": "5px"
        } as React.CSSProperties}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Box sx={{ height: '100%' }}>
              <TestimonialCard testimonial={testimonial} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="swiper-custom-pagination"></div> */}
    </Box>
    </Container>
    </Box>

  );
};

export default Testimonials;