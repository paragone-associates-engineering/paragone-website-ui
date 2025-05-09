import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  maxWidth?: string | number;
  marginBottom?: number | string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  maxWidth = '800px',
  marginBottom = 6,
}) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        mb: marginBottom,
        width: '100%',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      {subtitle && (
        <Typography
          variant="subtitle2"
          sx={{
            color: 'primary.main',
            fontWeight: 400,
            mb: 1,
            //textTransform: 'capitalize',
            letterSpacing: '1px',
            fontSize: '0.875rem',
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontWeight: 700,
          mb: description ? 2 : 0,
          maxWidth: centered ? maxWidth : '100%',
          mx: centered ? 'auto' : 0,
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: centered ? maxWidth : '100%',
            mx: centered ? 'auto' : 0,
            mt: 1,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
