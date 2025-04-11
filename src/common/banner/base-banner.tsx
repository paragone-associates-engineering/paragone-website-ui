import React from 'react';
import { Box,  Container } from '@mui/material';

// Types for props
interface BaseBannerProps {
  backgroundImage?: string;
  height?: string | number | { xs: string; sm:string; md: string };
  children: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

// Base Banner component that can be extended
export const BaseBanner = ({ 
  backgroundImage, 
  height = '100vh', 
  children,
  overlay = true,
  overlayOpacity = 0.6
}: BaseBannerProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height,
        width: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        transition: 'background-image 0.5s ease-in-out',
       // mb: { xs: 8, sm: 0 },
        justifyContent:"center",
        alignItems: 'center',
        '&::before': overlay ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 1
        } : {}
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          marginX:"auto",
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </Container>
    </Box>
  );
};