import { experimentalStyled as styled } from "@mui/material/styles";
import { Facebook, Instagram, LinkedIn, YouTube, WhatsApp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#EFF3F5',
  padding: theme.spacing(6, 4),
  color: theme.palette.text.primary,
}));

const Item = styled(Box)({
  textAlign: "left",
});

const SubscribeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  maxWidth: "600px",
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.background.paper,
}));

const SubscribeInput = styled(TextField)({
  flexGrow: 1,
  border: "none",
  "& fieldset": { border: "none" },
});

export default function Footer() {
  return (
    <FooterContainer>
      <Box textAlign={{ xs: 'center', md: 'left' }} mb={4}>
      <Grid 
        container 
        spacing={2} 
        alignItems="center" 
        justifyContent="center"
        direction={{ xs: 'column', md: 'row' }}
      >
        <Grid item xs={12} md={5}>
        <Typography variant="h5" fontWeight={600}>
          Sign up to our newsletter to get the latest real estate updates
        </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <SubscribeBox>
            <SubscribeInput
              fullWidth
              placeholder="Your email address"
              variant="outlined"
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </SubscribeBox>
        </Box>
        </Grid>
      </Grid>
      </Box>


      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <img src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741266763/Logo_1_t8y9ap.svg" alt="Logo" width={150} />
            <Box display="flex" gap={1} mt={2}>
              {/* Social media icons */}
              <Grid item xs={12} sm={12} textAlign={{ xs: "center", sm: "left" }}>
         
          <Box sx={{ mt: 2 }}>
            {[Facebook, Instagram, LinkedIn, YouTube].map((Icon, index) => (
              <Icon key={index} sx={{ fontSize: 28, mx: 1, cursor: "pointer", color: "#333" }} />
            ))}
          </Box>
        </Grid>
            </Box>
          </Item>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Item>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Link to="/about-us" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>About us</Typography>
      </Link>
      <Link to="/listing" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>Listing</Typography>
      </Link>
      <Link to="/property-request" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>Property request</Typography>
      </Link>
      <Link to="/partner-with-us" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>Partner with us</Typography>
      </Link>
      <Link to="/careers" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>Career</Typography>
      </Link>
      <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>Our blog</Typography>
      </Link>
      <Link to="/refer-and-earn" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography>Refer and Earn</Typography>
      </Link>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Privacy Policy
            </Typography>
            <Typography>Our privacy policy</Typography>
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{ mt: 2 }}
            >
              We Are Social
            </Typography>
            <Typography>Facebook</Typography>
            <Typography>Instagram</Typography>
            <Typography>LinkedIn</Typography>
            <Typography>YouTube</Typography>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Typography>Call for any help:</Typography>
            <Typography fontWeight={600}>(+234) 816 046 7439</Typography>
            <Typography fontWeight={600}>(+234) 915 636 2645</Typography>
            <Typography mt={2}>Mail to our support team:</Typography>
            <Typography fontWeight={600}>
              support@paragonesignature.com
            </Typography>
            <Typography fontWeight={600}>info@paragonesignature.com</Typography>
            <Typography mt={2}>Address:</Typography>
            <Typography fontWeight={600}>
              7, Sola Gbeleyi Street, off 21 Road, Gowon Estate, Lagos.
            </Typography>
          </Item>
        </Grid>
      </Grid>

      <Box sx={{ position: "fixed", zIndex:10, bottom: 20, right: 20, backgroundColor: "#25D366", p: 1.5, borderRadius: "50%", cursor: "pointer", display:"flex", alignItems:"center", justify:"center" }}>
        <WhatsApp sx={{ fontSize: 32, color: "white" }} />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography textAlign="center" mt={3}>
        © {new Date().getFullYear()} Paragone Signature All Rights Reserved
      </Typography>
    </FooterContainer>
  );
}
