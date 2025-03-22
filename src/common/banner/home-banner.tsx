import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  InputLabel,
  FormControl,
  Select,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { BaseBanner } from './base-banner';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  return (
    <BaseBanner 
      backgroundImage="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741267158/sean-pollock-PhYq704ffdA-unsplash_zew9au.jpg"
      height={{ xs: '850px', sm:'650px', md: '100vh' }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          gap:2,
          pt: { xs: 15, md: 0 },
          //mb: { xs: 15, md: 0 },
        }}
      >
       
        <Box 
          sx={{ 
            color: 'white', 
            mb: { xs: 4, md: 0 },
            width: { xs: '100%', sm: '50%' },
            textAlign:{xs:"center", sm:"left"}
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 1
            }}
          >
            A World of Real Estate Solutions -
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
            For You
          </Typography>
          <Typography 
            variant="body1" 
            //textAlign='center'
            sx={{ 
              maxWidth: '450px',
              fontSize: { xs: '1rem', md: '1.1rem' },
              mx:{xs:'auto', sm:'0'}
            }}
          >
            Whether buying, selling, renting, or short stay, we have got you covered
          </Typography>
        </Box>

        {/* Right side with search box */}
        <Box 
          sx={{ 
            width: { xs: '100%', sm: '50%' },
            mt:0,
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
                  whiteSpace:'nowrap',
                  '&.Mui-selected': {
                    backgroundColor: '#FFA500',
                    color: 'white',
                    border:0
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

            {/* Search Form */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      placeholder="Your location"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocationOnOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                        sx: {
                          pr: 1,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e0e0e0',
                          }
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                                      <InputLabel id="room-label">Property Type</InputLabel>
                                      <Select
                                        labelId="property-label"
                                        name="property"
                                        //size="small"
                                        // value={formData.experience}
                                        // onChange={handleSelectChange}
                                        label="Select Type"
                                        required
                                      >
                                        <MenuItem value="">Select type</MenuItem>
                      <MenuItem value="apartment">Apartment</MenuItem>
                      <MenuItem value="house">House</MenuItem>
                      <MenuItem value="office">Office</MenuItem>
                                      </Select>
                                    </FormControl>
                    
                    
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                                      <InputLabel id="room-label">Select Room</InputLabel>
                                      <Select
                                        labelId="room-label"
                                        name="room"
                                        //size='small'
                                        // value={formData.experience}
                                        // onChange={handleSelectChange}
                                        label="Select Room"
                                        required
                                      >
                                        <MenuItem value="">Select room</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3+</MenuItem>
                                      </Select>
                                    </FormControl>
                    

                    
                  </Grid>
                </Grid>
                
                {/* Bottom section with button and advanced search */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                    mt: 2
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#FFA500',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      py: 1,
                      px: 3,
                      '&:hover': {
                        bgcolor: '#F29100',
                      },
                      width: { xs: '100%', md: 'auto' },
                      mb: { xs: 1, sm: 0 }
                    }}
                  >
                    Search now
                  </Button>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      width: { xs: '100%', md: 'auto' },
                      justifyContent: { xs: 'flex-end', md: 'flex-start' }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      //color="primary" 
                      sx={{ cursor: 'pointer' }}
                    >
                      Advanced search
                    </Typography>
                    <IconButton size="small" color="primary">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {/* Similar content for Sale tab */}
              <Box sx={{ p: 3 }}>
                <Typography variant='h6'> Coming soon ....</Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 3 }}>
                <Typography variant='h6'> Coming soon ....</Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
            <Box sx={{ p: 3 }}>
                <Typography variant='h6'> Coming soon ....</Typography>
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Box>
      
      {/* Navigation controls */}
      <Box 
        sx={{ 
          display: {xs:'none', sm: 'flex' }, 
          position: 'absolute',
          bottom: { xs: 16, sm: 32 },
          left: { xs: 16, sm: 32 },
          alignItems: 'center',
          color: 'white'
        }}
      >
        <IconButton 
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
