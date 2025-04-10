import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Button, 
  //Rating, 
  useTheme, 
  IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link} from 'react-router-dom';
import { ApiProperty } from '../types/properties';

const PropertyCard = ({ property }: { property: ApiProperty }) => {
  const [favorite, setFavorite] = useState(false);
  const theme = useTheme();
  const bedrooms = property?.propertyDetails?.find((detail) => detail.name === 'bedrooms')?.value;
  const bathrooms = property?.propertyDetails?.find((detail) => detail.name === 'bathrooms')?.value;
  
  
  return (
    <Card 
    component={Link}
    to={`/listings/${property?.id}`}
      sx={{  
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'visible',
        //boxShadow: 3,
        position: 'relative',
        bgcolor:'transparent',
        mb:16,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={ property?.images?.length > 0 ? property?.images[0] : 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&w=800&q=80'}
          alt={property?.propertyName}
          sx={{ borderRadius: '8px' }}
        />
        <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 1 }}>
          <Chip 
            label={property?.listingType === 'For Sale' ? 'For sale' : 'For rent'} 
            color={property?.listingType === 'For Sale' ? 'primary' : 'secondary'}
            size="small"
            sx={{ 
              backgroundColor: property?.listingType === 'For Sale' ? '#46B0FD' : '#B032EB',
              color: 'white',
              fontWeight: 'bold',
              px:1,
              py:2
            }} 
          />
          {/* {property?.featured && (
            <Chip 
              label="Featured" 
              size="small"
              sx={{ 
                backgroundColor: '#f57c00', 
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
          )} */}
        </Box>
        <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 1 }}>
          <IconButton
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
              width: 36,
              height: 36
            }}
            onClick={() => {}}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
              width: 36,
              height: 36,
              color: favorite ? theme.palette.error.main : 'inherit'
            }}
            onClick={() => setFavorite(!favorite)}
          >
            {favorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 85,
            right: 35,
            bgcolor: '#ff9800',
            color: 'white',
            borderRadius: 1,
            p: 0.75,
            zIndex:2,
            fontWeight: 'bold',
            boxShadow: 2
          }}
        >
          ₦{property?.amount?.toLocaleString()}
        </Box>
      </Box>
      <CardContent sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) ',
      width: '93%',
      minHeight:'200px',
      height:'100%',
      bgcolor: 'background.paper', 
      pt: 3, 
      border:1,
      borderColor:'divider',
      //mb:10,
      display:'flex',
      justifyContent:'center',
      borderRadius: '8px',
    }}>
        <Box sx={{mb:10}}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {property?.propertyName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ color: 'primary.main', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {property?.location}
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component='img' src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742659739/fi_12907174_dvvx70.svg' alt='squareft' sx={{p:0.5, width:20, height:20, color: 'text.secondary', mr: 0.3, border:'1px solid #333', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent:'center' }} />
              {/* <SquareFootIcon sx={{ml:1, fontSize:17}}  /> */}
             
              <Typography variant="body2">{property?.area}sqm</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace:'nowrap' }}>
            <Box component='img' src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742659737/fi_2284001_zwywd0.svg' alt='squareft' sx={{p:0.5, width:20, height:20, color: 'text.secondary', mr: 0.3, border:'1px solid #333', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent:'center' }} />
              {/* <BedIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} /> */}
              <Typography variant="body2">{bedrooms} rooms</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace:'nowrap'  }}>
            <Box component='img' src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742659735/fi_2425844_nnawgj.svg' alt='squareft' sx={{p:0.5, width:20, height:20, color: 'text.secondary', mr: 0.3, border:'1px solid #333', borderRadius:'50%', display: 'flex', alignItems: 'center', justifyContent:'center' }} />
              {/* <BathtubIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} /> */}
              <Typography variant="body2">{bathrooms} bath</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Button 
            size="small" 
            sx={{ textTransform: 'none', fontWeight: 'bold', color:'text.secondary' }}
            endIcon={<ChevronRightIcon />}
          >
            More details
          </Button>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={property?.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" sx={{ ml: 0.5, fontWeight:'bold' }}>
              {property?.rating}
            </Typography>
          </Box> */}
        </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
