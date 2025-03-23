import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from './navbar';
import Footer from './footer';
import AllRoutes from './route';
import ScrollToTop from "../common/scroll-to-top";

const Layout = () => {
  const location = useLocation(); 

  const getActiveLink = () => {
    const currentPath = location.pathname;
    if (currentPath === '/') return 'home';
    if (currentPath.includes('about-us')) return 'about-us';
    if (currentPath.includes('listings')) return 'listings';
    if (currentPath.includes('partner-with-us')) return 'partner';
    if (currentPath.includes('become-an-associate')) return 'associat';
    if (currentPath.includes('property-request')) return 'request';
    if (currentPath.includes('property-calculator')) return 'calculator';
  }
  return (
    <>
      <Navbar activeLink={getActiveLink()} />
       <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                //maxWidth: { xs: "100vw" },
                overflowX:"hidden",
                margin:"0px auto"
              }}
            >
               <ScrollToTop />
     <AllRoutes />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;