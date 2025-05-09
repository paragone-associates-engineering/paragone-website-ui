import { Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { BaseBanner } from './base-banner';
import { Link as RouterLink } from "react-router-dom"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
  breadcrumbs: Array<{
    label: string
    href?: string
  }>
  currentPage?: string;
}

export const PageBanner = ({ 
  title, 
  backgroundImage = 'https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741345070/paragone-pages-cover_eau9fa.jpg',
  breadcrumbs, 
}: PageBannerProps) => {
  return (
    <BaseBanner 
      backgroundImage={backgroundImage} 
      height='60vh' 
    >
      <Box sx={{ textAlign: 'center', color: 'white', width:'100%' }}>
        <Typography variant="h3"  component="h1" sx={{ fontWeight: 'bold', mb: 2, textTransform:'capitalize' }}>
          {title}
        </Typography>
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: "white" }} />}
            aria-label="breadcrumb"
            sx={{
              "& .MuiBreadcrumbs-ol": {
                justifyContent: "center",
              },
              color: "primary.main",
            }}
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1

              return isLast ? (
                <Typography key={crumb.label} textTransform='capitalize' color="primary.main">
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  key={crumb.label}
                  component={RouterLink}
                  to={crumb.href || "#"}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    textTransform:'capitalize',
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {crumb.label}
                </Link>
              )
            })}
          </Breadcrumbs>
      </Box>
    </BaseBanner>
  );
};