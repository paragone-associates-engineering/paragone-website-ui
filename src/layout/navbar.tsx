// import { useState, useEffect } from 'react';
import  { useState, useEffect } from 'react';
import { 
 // AppBar, 
  Toolbar, 
  //Typography, 
  Button, 
  Box, 
  Container, 
  useMediaQuery, 
  useTheme, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Paper
} from '@mui/material';
import {Notes, Close, PeopleAlt }  from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import CustomButton from '../common/button';

interface NavbarProps {
  transparent?: boolean;
  activeLink?: string;
}

const Navbar = ({  activeLink = 'home' }: NavbarProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  //const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', id: 'home' },
    { label: 'About us', path: '/about-us', id: 'about-us' },
    { label: 'Listings', path: '/listings', id: 'listings' },
    { label: 'Partner with us', path: '/partner-with-us', id: 'partner' },
    { label: 'Property request', path: '/property-request', id: 'request' },
    { label: 'Property Calculator', path: '/property-calculator', id: 'calculator' },
  ];

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrolled = window.scrollY > 10;
  //     if (isScrolled !== scrolled) {
  //       setScrolled(isScrolled);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [scrolled]);

  useEffect(() => {
    setMobileOpen(false); 
  }, [location.pathname]); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile menu drawer
  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ml: 1 }}>
          <img src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741266763/Logo_1_t8y9ap.svg" alt="Logo" width={150} />
          </Box>
        </Box>
        <IconButton 
          edge="end" 
          color="inherit" 
          aria-label="close menu" 
          onClick={handleDrawerToggle}
        >
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              sx={{ 
                textAlign: 'center',
                py: 1.5,
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: activeLink === item.id ? theme.palette.primary.main : 'inherit',
                '&:hover': {
                        color: theme.palette.primary.main,
                      },
              }}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: activeLink === item.id ? 'medium' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
         <ListItem disablePadding sx={{  px: 2, display:'flex', alignItems:'center', justifyContent:'center', mx:'auto' }}>
         <ListItemButton 
              component={RouterLink} 
              to='/events'
              sx={{ 
                textAlign: 'center',
                py: 1.5,
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: activeLink === 'Events' ? theme.palette.primary.main : 'inherit',
                '&:hover': {
                        color: theme.palette.primary.main,
                      },
              }}
            >
              <ListItemText 
                primary={'Events'} 
                primaryTypographyProps={{ 
                  fontWeight: activeLink === 'Events' ? 'medium' : 'normal'
                }}
              />
            </ListItemButton>
         
        </ListItem>
        <ListItem disablePadding sx={{  px: 2, display:'flex', alignItems:'center', justifyContent:'center', mx:'auto' }}>
         <ListItemButton 
              component={RouterLink} 
              to='/resources'
              sx={{ 
                textAlign: 'center',
                py: 1.5,
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: activeLink === 'resources' ? theme.palette.primary.main : 'inherit',
                '&:hover': {
                        color: theme.palette.primary.main,
                      },
              }}
            >
              <ListItemText 
                primary={'Resources'} 
                primaryTypographyProps={{ 
                  fontWeight: activeLink === 'resources' ? 'medium' : 'normal'
                }}
              />
            </ListItemButton>
         
        </ListItem>
        <Box sx={{ mt: 2,  display:'flex', alignItems:'center', justifyContent:'center',gap:2,mx:'auto', maxWidth:280 }}>
        <ListItem disablePadding sx={{  display:'flex', alignItems:'center', justifyContent:'center' }}>
          <CustomButton href='/contact-us' sx={{py: 1, px: 2}} startIcon={PeopleAlt} >
           Contact us
          </CustomButton>
        </ListItem>
        <ListItem disablePadding sx={{  display:'flex', alignItems:'center', justifyContent:'center' }}>
          <CustomButton href='/become-an-associate' sx={{py: 1, px: 2}} startIcon={PeopleAlt} >
            Join us
          </CustomButton>
        </ListItem>
        </Box>
      </List>
    </Box>
  );

  return (
    <Box 
      sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
        p: { xs: 2, lg: 3 },
        transition: 'all 0.3s',
      }}
    >
      <Container maxWidth="xl">
        <Paper
          //elevation={scrolled ? 4 : 0}
          sx={{
           // bgcolor: scrolled ? 'rgba(255, 255, 255, 1)' : transparent ? 'rgba(255, 255, 255, 0.9)' : 'white',
            borderRadius: '8px',
            transition: 'all 0.3s',
          }}
        >
          <Toolbar 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              px: { xs: 2, lg: 3 },
              py: { xs: 0.5, sm: 0.5 },
              minHeight: { xs: '64px', sm: '64px' }
            }}
          >
            
            <Box component={RouterLink} to='/' sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
              <img src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741266763/Logo_1_t8y9ap.svg" alt="Logo" width={150} />
              </Box>
            </Box>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      mx: { xs: 0.5, sm: 0.7, lg: 1.5 },
                      textTransform: 'none',
                      position: 'relative',
                      whiteSpace:'nowrap',
                      color: activeLink === item.id ? theme.palette.primary.main : 'inherit',
                      fontWeight: activeLink === item.id ? 'medium' : 'normal',
                      fontSize: '0.9rem',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                      '&::after': activeLink === item.id ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        bgcolor: theme.palette.primary.main,
                      } : {},
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
            
           
            <Box sx={{ display: 'flex', alignItems: 'center', justifycontent:'center', whiteSpace:'nowrap' }}>
              {!isMobile && (
                 <CustomButton href='/become-an-associate' sx={{py:0.8,px:2, width:'100%'}} startIcon={PeopleAlt} >
                   Join us
                 </CustomButton>
                
              )}
              
              {/* Mobile menu button */}
              {isMobile && (
                <IconButton
                  color="primary"
                  aria-label="open menu"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <Notes />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Paper>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: '100%', 
            maxWidth: { xs: '100%', sm: '400px' },
            boxSizing: 'border-box' 
          },
        }}
        anchor="right"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
