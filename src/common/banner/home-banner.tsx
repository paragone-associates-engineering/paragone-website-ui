import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { BaseBanner } from './base-banner';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TabContent from './tab-content';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-tabpanel-${index}`}
      aria-labelledby={`property-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export const HomeBanner = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [tabValue, setTabValue] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel images
  const carouselImages = [
    "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741267158/sean-pollock-PhYq704ffdA-unsplash_zew9au.jpg",
    "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1744346003/2149661456_rkz7pp.jpg",
    "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1744346009/48219_1_rozl7o.jpg",
    "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1744174456/tunde-buremo-cebfd5BgDC8-unsplash_lq3lll.jpg"
    // "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    // "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop"
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Auto slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 7000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <BaseBanner 
      backgroundImage={carouselImages[currentImageIndex]}
      height={{ xs: '850px', sm:'650px', md: '100vh' }}
      // sx={{
      //   transition: 'background-image 0.5s ease-in-out',
      // }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          gap: 2,
          pt: { xs: 15, md: 0 },
        }}
      >
      
        <Box 
          sx={{ 
            color: 'white', 
            mb: { xs: 4, md: 0 },
            width: { xs: '100%', sm: '50%' },
            textAlign: {xs: "center", sm: "left"}
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2,
              mb: 1
            }}
          >
            A world of real estate solutions -
          </Typography>
          <Typography 
            variant="h2" 
            component="span" 
            sx={{ 
              color: '#FFA500', 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              display: 'block',
              mb: 2
            }}
          >
            for you
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '450px',
              fontSize: { xs: '1rem', md: '1.1rem' },
              mx: {xs: 'auto', sm: '0'}
            }}
          >
            Whether buying, selling, renting, or short stay, we have got you covered
          </Typography>
        </Box>

        {/* Right side with search box */}
        <Box 
          sx={{ 
            width: { xs: '100%', sm: '50%' },
            mt: 0,
            mb: { xs: 15, sm: 0 },
          }}
        >
          <Paper 
            elevation={3}
            sx={{ 
              borderRadius: '8px',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            {/* Tabs */}
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant={isSmall ? "scrollable" : "fullWidth"}
              scrollButtons={isSmall ? "auto" : false}
              sx={{
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'medium',
                  fontSize: '0.9rem',
                  minHeight: '48px',
                  whiteSpace: 'nowrap',
                  '&.Mui-selected': {
                    backgroundColor: '#FFA500',
                    color: 'white',
                    border: 0
                  }
                },
                borderBottom: '1px solid #eee'
              }}
            >
              <Tab label="Rent" />
              <Tab label="Sale" />
              <Tab label="Short stay" />
              <Tab label="Land" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <TabContent />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TabContent />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <TabContent />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <TabContent tabIndex={3} />
            </TabPanel>
          </Paper>
        </Box>
      </Box>
      
      {/* Navigation controls */}
      <Box 
        sx={{ 
          display: {xs: 'none', sm: 'flex'}, 
          position: 'absolute',
          bottom: { xs: 16, sm: 32 },
          left: { xs: 16, sm: 32 },
          alignItems: 'center',
          color: 'white'
        }}
      >
        <IconButton 
          onClick={goToPrevImage}
          sx={{ 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.5)',
            mr: 1,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="caption" sx={{ mr: 1 }}>PREV</Typography>
        <Typography variant="caption" sx={{ mx: 1, color: '#FFA500' }}>|</Typography>
        <Typography variant="caption" sx={{ mx: 1 }}>NEXT</Typography>
        <IconButton 
          onClick={goToNextImage}
          sx={{ 
            color: '#FFA500', 
            border: '1px solid #FFA500',
            ml: 1,
            '&:hover': {
              bgcolor: 'rgba(255,165,0,0.1)'
            }
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </BaseBanner>
  );
};