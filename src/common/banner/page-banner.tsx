import { Typography, Box, Breadcrumbs } from "@mui/material";
import { BaseBanner } from "./base-banner";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { AnimatedWrapper } from "../animations/animated-wrapper";
import { useScrollManager } from "../../hooks/use-scroll";

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  currentPage?: string;
}

export const PageBanner = ({
  title,
  backgroundImage = "https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741345070/paragone-pages-cover_eau9fa.jpg",
  breadcrumbs,
}: PageBannerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToHash, saveCurrentPosition } = useScrollManager();

  const handleLinkClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!href || href === "#") return;

    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const currentPath = location.pathname;
      
      // If it's the same page, just scroll to the hash
      if (!path || path === currentPath) {
        if (hash) {
          scrollToHash(hash);
          // Update URL without triggering navigation
          window.history.pushState(null, '', `${currentPath}#${hash}`);
        }
      } else {
        // Different page with hash - save current position and navigate
        saveCurrentPosition();
        navigate(`${path}#${hash}`);
      }
    } else {
      // Regular navigation - save current position
      saveCurrentPosition();
      navigate(href);
    }
  };

  return (
    <BaseBanner
      backgroundImage={backgroundImage}
      height={{ xs: "50vh", sm: "40vh", md: "60vh" }}
    >
      <Box sx={{ textAlign: "center", color: "white", width: "100%" }}>
        <AnimatedWrapper delay={0.2}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: { xs: "250px", sm: "400px", md: "900px" },
              mx: "auto",
              display: "block",
            }}
          >
            {title}
          </Typography>
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.4}>
          <Breadcrumbs
            separator={
              <NavigateNextIcon fontSize="small" sx={{ color: "white" }} />
            }
            aria-label="breadcrumb"
            sx={{
              "& .MuiBreadcrumbs-ol": {
                justifyContent: "center",
              },
              color: "primary.main",
            }}
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return isLast ? (
                <Typography
                  key={crumb.label}
                  textTransform="capitalize"
                  color="primary.main"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: { xs: "250px", sm: "400px", lg: "600px" },
                    display: "block",
                  }}
                >
                  {crumb.label}
                </Typography>
              ) : (
                <Box
                  key={crumb.label}
                  component="span"
                  onClick={(e) => crumb.href && handleLinkClick(crumb.href, e)}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    textTransform: "capitalize",
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {crumb.label}
                </Box>
              );
            })}
          </Breadcrumbs>
        </AnimatedWrapper>
      </Box>
    </BaseBanner>
  );
};