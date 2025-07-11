import { experimentalStyled as styled } from "@mui/material/styles";
import {
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  WhatsApp,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import toast from "react-hot-toast";
import { useState } from "react";
import CustomButton from "../common/button";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#EFF3F5",
  width: "100vw",
  padding: theme.spacing(6, 4),
  color: theme.palette.text.primary,
}));

const Item = styled(Box)({
  textAlign: "left",
});

const SubscribeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  maxWidth: "650px",
  width:'100%',
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
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/emails/subscribe`, {email:email});
      toast.success("Email submitted successfully!");
      setEmail('')
     // console.log("suscess", email);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Submission failed. Try again!");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FooterContainer>
      <Box  mb={4}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", md: "row" }}
        >
          <Grid item xs={12} md={5}>
            <Typography variant="h5" fontWeight={600}>
              Sign up to our newsletter to get the latest real estate updates
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="form"
              onSubmit={onSubmit}
              mt={2}
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <SubscribeBox>
                <SubscribeInput
                  fullWidth
                  placeholder="Your email address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CustomButton isLoading={isLoading}>Subscribe</CustomButton>
              </SubscribeBox>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3}>
  <Grid item xs={12} md={3}>
    <Item>
      <img
        src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741266763/Logo_1_t8y9ap.svg"
        alt="Logo"
        width={150}
      />
      
      {/* Social media icons */}
      <Box 
        sx={{ 
          mt: 2,
          display: 'flex',
          justifyContent: { xs: 'flex-start', sm: 'flex-start' }, // Always left-aligned
          alignItems: 'center',
          gap: 1
        }}
      >
        {[
          {
            Icon: Facebook,
            url: "https://www.facebook.com/paragonesignature?mibextid=wwXIfr",
          },
          {
            Icon: Instagram,
            url: "https://www.instagram.com/paragonesignatureltd?igsh=MWc2bXBjczNveHF5eg%3D%3D&utm_source=qr",
          },
          {
            Icon: LinkedIn,
            url: "https://www.linkedin.com/company/paragone-signature-associates/",
          },
          {
            Icon: YouTube,
            url: "https://youtube.com/@paragonesignature?si=hY2Qa3DEyhwobozK",
          },
        ].map(({ Icon, url }, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: "none",
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icon
              sx={{
                fontSize: 28,
                cursor: "pointer",
                color: "#333",
                transition: "color 0.3s",
                "&:hover": { color: "primary.main" },
              }}
            />
          </a>
        ))}
      </Box>
    </Item>
  </Grid>

        <Grid item xs={12} md={2}>
          <Item>
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{
                borderBottom: "2px solid",
                borderColor: "primary.main",
                color: "text.primary",
                display: "inline-block",
                pb: 0.5,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Link
              to="/about-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                About us
              </Typography>
            </Link>
            <Link
              to="/listings"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Listings
              </Typography>
            </Link>
            <Link
              to="/property-request"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Property request
              </Typography>
            </Link>
            <Link
              to="/partner-with-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Partner with us
              </Typography>
            </Link>
            <Link
              to="/careers"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
              sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}>Careers</Typography>
            </Link>
            <Link
              to="/blog"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Our blog
              </Typography>
            </Link>
            <Link
              to="/refer-and-earn"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Refer and Earn
              </Typography>
            </Link>

            <Link
              to="/events"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
               Events
              </Typography>
            </Link>
            <Link
              to="/resources"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
              Resources
              </Typography>
            </Link>
          </Item>
        </Grid>

      <Grid item xs={12} md={2}>
  <Item sx={{display:'flex', flexDirection:'column'}}>
    <Typography
      variant="h6"
      fontWeight={600}
      gutterBottom
      component="a"
      href="/privacy.pdf"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        borderBottom: "2px solid",
        borderColor: "primary.main",
        display: "inline-block",
        pb: 0.5,
        mb: 2,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "color 0.3s ease",
        maxWidth:'120px',
        '&:hover': {
          color: 'primary.main',
        }
      }}
    >
      Privacy Policy
    </Typography>
    <Typography
      component="a"
      href="/privacy.pdf"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "color 0.3s ease",
        '&:hover': {
          color: 'primary.main',
        }
      }}
    >
      TCs, Refund & Privacy
    </Typography>
  </Item>
</Grid>

        <Grid item xs={12} md={2}>
          <Item>
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{
                borderBottom: "2px solid",
                borderColor: "primary.main",
                display: "inline-block",
                pb: 0.5,
                mb: 2,
              }}
            >
              We Are Social
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                component="a"
                color="text.secondary"
                href="https://www.facebook.com/paragonesignature?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </Typography>
              <Typography
                component="a"
                color="text.secondary"
                href="https://www.instagram.com/paragonesignatureltd?igsh=MWc2bXBjczNveHF5eg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Typography>
              <Typography
                component="a"
                color="text.secondary"
                href="https://www.linkedin.com/company/paragone-signature-associates/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Typography>
              <Typography
                component="a"
                color="text.secondary"
                href="https://youtube.com/@paragonesignature?si=hY2Qa3DEyhwobozK"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </Typography>
            </Box>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Link to="/contact-us">
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  display: "inline-block",
                  color: "text.primary",
                  pb: 0.5,
                  mb: 2,
                  '&:hover': {
                color: 'primary.main',
                 }
                }}
              >
                Contact Us
              </Typography>
            </Link>
            {/* Section 1: Call */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: "2.8px",
                  backgroundColor: "#3E3E3E",
                  borderRadius: 2,
                  height: "72px",
                  mt: "4px",
                }}
              />
              <Box>
                <Typography sx={{ mb: 1 }}>Call for any help:</Typography>
                <Typography fontWeight={600}>(+234) 816 046 7439</Typography>
                <Typography fontWeight={600}>(+234) 915 636 2645</Typography>
              </Box>
            </Box>

            {/* Section 2: Mail */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: "2.8px",
                  backgroundColor: "#3E3E3E",
                  borderRadius: 2,
                  height: "65px",
                  mt: "4px",
                }}
              />
              <Box>
                <Typography>Mail to our support team:</Typography>
                <Typography fontWeight={600}>
                  info@paragonesignature.com
                </Typography>
              </Box>
            </Box>

            {/* Section 3: Address */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: "4px",
                  backgroundColor: "#3E3E3E",
                  borderRadius: 2,
                  height: "65px",
                  mt: "4px",
                }}
              />
              <Box>
                <Typography>Address:</Typography>
                <Typography fontWeight={600}>
                  7, Sola Gbeleyi Street, off 21 Road, Gowon Estate, Lagos.
                </Typography>
              </Box>
            </Box>
          </Item>
        </Grid>
      </Grid>

      <a
        href="https://wa.me/2348160467439"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          sx={{
            position: "fixed",
            zIndex: 10,
            bottom: 20,
            right: 20,
            backgroundColor: "#25D366",
            p: 1.5,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WhatsApp sx={{ fontSize: 32, color: "white" }} />
        </Box>
      </a>

      <Divider sx={{ my: 4 }} />

      <Typography textAlign="center" mt={3}>
        © {new Date().getFullYear()} Paragone Signature. All Rights Reserved
      </Typography>
    </FooterContainer>
  );
}
