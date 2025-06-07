import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { PlayCircle as PlayCircleIcon } from "@mui/icons-material";
import Testimonials from "../common/testimonial";
import { PageBanner } from "../common/banner/page-banner";
import CustomButton from "../common/button";

const RealEstateBrokerage = () => {
  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title="Real Estate Brokerage"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Real Estate Brokerage" },
        ]}
      />

      <Container maxWidth="lg" sx={{ pb: 5, pt: { xs: 0, sm: 6 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871630/nupo-deyon-daniel-67ruAEYmp4c-unsplash_1_2_kh8dto.png"
              alt="Real Estate Brokerage"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Real Estate Brokerage: Selling - Brokering - Buying
            </Typography>
            <Typography variant="body1" paragraph>
              Selling and buying your property shouldn't be a lengthy process.
              That is why we have developed a streamlined approach to ensure a
              smooth and efficient experience for our clients. Our goal is to
              deliver exceptional value to both sellers and buyers, ensuring
              swift transactions at optimal prices. By leveraging advanced
              digital and traditional marketing strategies, we connect the right
              buyers with the right properties.
            </Typography>
            <Typography variant="body1" paragraph>
              Our experienced brokers are expert negotiators dedicated to
              securing the best outcomes for our clients. From initial listing
              to final sale, we manage all complexities, allowing you to enjoy a
              stress-free experience and reap the rewards.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Simple Process
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
            Discover how we simplify buying, selling and leasing properties with
            expert guidance and personalized service.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  border: "1.5px solid #DDDDDD",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871625/fi_2838794_av7qqh.svg"
                    alt="Real Estate Brokerage"
                  />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  align="center"
                >
                  Make an appointment
                </Typography>
                <Typography variant="body2" align="center">
                  Schedule a consultation with our experts to discuss your
                  buying, selling or leasing goals with our brokers.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  border: "1.5px solid #DDDDDD",
                  backgroundColor: "background.paper",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871632/fi_6754405_zxdm6m.svg"
                    alt="Real Estate Brokerage"
                  />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  align="center"
                >
                  Evaluate the property
                </Typography>
                <Typography variant="body2" align="center">
                  We conduct thorough market analysis and inspections for
                  maximizing property value or finding the right investment.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  border: "1.5px solid #DDDDDD",
                  backgroundColor: "background.paper",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871627/fi_1189200_amkhjc.svg"
                    alt="Real Estate Brokerage"
                  />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  align="center"
                >
                  Close the deal
                </Typography>
                <Typography variant="body2" align="center">
                  From negotiating the best terms to managing paperwork,
                  handling, we ensure your transaction achieves optimal results.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            my: 8,
            px: 4,
            py: 6,
            borderRadius: 2,
            backgroundColor: "secondary.main",
            backgroundImage:
              "url(https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871622/Mask_group_2_k2b2oe.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, fontSize: "2rem" }}
                gutterBottom
              >
                Let's achieve your real estate goals together
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <CustomButton href="/contact-us" sx={{ width: "180px" }}>
                Contact us
              </CustomButton>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8, position: "relative" }}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871619/Mask_group_4_mxojsp.png"
            alt="Success Story Video"
            sx={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              borderRadius: 2,
              filter: "brightness(0.7)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom>
              Watch our success story
            </Typography>
            <IconButton
              sx={{
                color: "white",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <PlayCircleIcon fontSize="large" />
            </IconButton>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
              >
                Contact us
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="overline" color="primary" gutterBottom>
            Top Benefits
          </Typography>
          <Typography variant="h4" component="h2">
            Why Clients Prefer Us
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom>
                      Our Market Expertise
                    </Typography>
                    <Typography variant="body2">
                      We offer you in-depth local market understanding of local
                      real estate trends and market conditions to maximize your
                      results.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom>
                      Personalized Service
                    </Typography>
                    <Typography variant="body2">
                      We create customized solutions that cater specifically to
                      your unique real estate goals, providing a personalized
                      experience from start to finish.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom>
                      Client-Centric Approach
                    </Typography>
                    <Typography variant="body2">
                      Our client-focused approach ensures your needs are
                      prioritized and met throughout the real estate transaction
                      process.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom>
                      Efficiency and Transparency
                    </Typography>
                    <Typography variant="body2">
                      We deliver streamlined processes and clear communications,
                      ensuring peace of mind throughout your real estate
                      journey.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom>
                      Comprehensive Support
                    </Typography>
                    <Typography variant="body2">
                      We handle every detail, from initial consultations to
                      closing, backed by a committed team focused on achieving
                      your real estate objectives.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <CustomButton href="/contact-us" sx={{ px: 6 }}>
                    Contact us
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871616/young-couple-moving-new-home-together-african-american-couple-with-cardboard-boxes_1_axeumt.png"
                alt="Family moving into new home"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Testimonials />
      </Container>
    </Box>
  );
};

export default RealEstateBrokerage;
