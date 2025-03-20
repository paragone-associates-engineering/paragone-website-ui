import { Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { BaseBanner } from './base-banner';

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
  currentPage: string;
}

export const PageBanner = ({ 
  title, 
  backgroundImage = 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741345070/paragone-pages-cover_eau9fa.jpg',
  currentPage 
}: PageBannerProps) => {
  return (
    <BaseBanner 
      backgroundImage={backgroundImage} 
      height='80vh' 
    >
      <Box sx={{ textAlign: 'center', color: 'white', width:'100%' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {title}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ 
          '& .MuiBreadcrumbs-ol': { 
            justifyContent: 'center' 
          },
          '& .MuiBreadcrumbs-li': { 
            color: 'white',
          },
          '& .MuiBreadcrumbs-separator': { 
            color: 'white' 
          }
        }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="white" sx={{color:'primary.main', textTransform:'capitalize'}}>{currentPage}</Typography>
        </Breadcrumbs>
      </Box>
    </BaseBanner>
  );
};