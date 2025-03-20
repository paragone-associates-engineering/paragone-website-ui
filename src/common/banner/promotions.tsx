import { Box, Grid2 } from '@mui/material';

const PromotionBanners = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <Grid2 container spacing={3} sx={{ mt: 3 }}>
      {[1, 2].map((item) => (
        <Grid2 size={{xs: 12, md:6}} key={`offer-${item}`}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              //height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt="Promotion Banner"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover', // Ensures image covers the area properly
                borderRadius: 2,
              }}
            />
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PromotionBanners;
