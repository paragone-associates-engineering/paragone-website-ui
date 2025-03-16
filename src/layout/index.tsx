import { Box } from "@mui/material";
import Navbar from './navbar';
import Footer from './footer';
import AllRoutes from './route';

const Layout = () => {
  const currentPath = window.location.pathname;
  const getActiveLink = () => {
    if (currentPath === '/') return 'home';
    if (currentPath.includes('about-us')) return 'about-us';
    if (currentPath.includes('listing')) return 'listings';
    if (currentPath.includes('partner-with-us')) return 'partner';
    if (currentPath.includes('become-an-associate')) return 'associat';
    if (currentPath.includes('property-request')) return 'request';
    if (currentPath.includes('property-calculator')) return 'calculator';
    return 'home';
  };

  return (
    <>
      <Navbar activeLink={getActiveLink()} />
       <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                maxWidth: { xs: "100vw" },
                overflowX:"hidden",
                margin:"0px auto"
              }}
            >
              
     <AllRoutes />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;