import { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material"
import Testimonials from "../common/testimonial"
import { PageBanner } from '../common/banner/page-banner';
import JobApplication from "./apply"
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/slices/job-slice"; 
import { RootState, AppDispatch } from "../redux/store";
import {  useSearchParams } from "react-router-dom";
import Loader from "../common/loader";
import { AnimatedWrapper } from "../common/animations/animated-wrapper";
import { Helmet } from "react-helmet-async";
const Careers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  useEffect(() => {
    dispatch(fetchJobs({ page }));
  }, [dispatch, page]);

  if (loading) return <Typography><Loader /></Typography>;

  return (
    <>
          <Helmet>
            <title>Careers | Paragone Signature & Associates</title>
            <meta
              name="description"
              content="At Paragone Signature & Associates, we are on a mission to transform the real estate industry through innovation, exceptional service, and the collective talents of our team members, each contributing their unique strengths to our collective success."
            />
          </Helmet>
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Careers' breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}  />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <AnimatedWrapper animation='slideLeft'>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741897467/luca-bravo-ujhKqutt3f0-unsplash_2_je4yff.png"
              alt="Modern workspace desk with laptop and mouse"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
            </AnimatedWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedWrapper>
            <Typography variant="h3" component="h1" gutterBottom>
              Excel Beyond Limits
            </Typography>
            <Typography variant="body1" paragraph>
              At Paragone Signature & Associates, we are on a mission to transform the real estate industry through
              innovation, exceptional service, and the collective talents of our team members, each contributing their
              unique strengths to our collective success. Results are key to us, and we prioritize the growth and
              achievements of every individual.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe in fostering an environment where excellence is paramount, and every employee is encouraged to
              reach their highest potential. Our passion for real estate drives us to continuously raise the bar. Join
              us and become part of a team that values your unique contributions, supports your professional
              development, and creates a conducive way for the real estate industry.
            </Typography>
            <Typography variant="body1">Discover the Paragone difference and elevate your career with us.</Typography>
            </AnimatedWrapper>
          </Grid>
        </Grid>
        </Container>

        <Box sx={{ my: 8, bgcolor:"secondary.main", py:8 }}>
        <Container maxWidth="lg" >
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Current Openings
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4}}>
          {loading ? (
  <Typography variant="h6" sx={{ textAlign: "center" }}>Loading jobs...</Typography>
) : error ? (
  <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>{error}</Typography>
) : jobs?.length === 0 ? (
  <Typography variant="h6" sx={{ textAlign: "center" }}>No jobs available.</Typography>
) : (
  jobs.map((job) => (
              <Grid item xs={12} md={4} key={job.id}>
                <Card elevation={0} sx={{ height: "100%", borderRadius: 2, backgroundColor: "background.paper" }}>
                  <CardContent sx={{ px: 2, textAlign: "center", borderBottom:"1px solid #ddd" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <Box
                        component="img"
                        src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741897405/fi_11358928_rlmxu3.svg'
                        alt={job.title}
                        sx={{
                          width: 80,
                          height: 80,
                        }}
                      />
                    </Box>
                     <Typography variant="h6" fontSize={22} letterSpacing={-1} lineHeight={1.1} component="h3" gutterBottom>
                      {job?.title}
                    </Typography>
                    <Typography variant="body2" sx={{ my: 2}}>
                      <div dangerouslySetInnerHTML={{ __html: job?.description.slice(0, 160) + "..." || "" }}></div>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 3, mt:2 }}>
                    <Button variant="contained" color="primary" size="large" href={`/careers/${job.id}`}>
                      Apply now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
           ))
          )}
          </Grid>
          </Container>
        </Box>
        <Container maxWidth="lg">
        <Box sx={{ my: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741899341/img_xizehs.png"
                alt="Modern desk with plant"
                sx={{
                  width: "100%",
                  height: {lg:"100%"},
                  objectFit: "cover",
                  borderRadius: 2,
                  flexShrink:0
                  //boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{maxWidth: "500px"}}>
              <Typography variant="h4" component="h2" 
              sx={{
                ml:{md:5, lg:0},
                mt:{xs: 5,md:0},
                fontWeight:700,
              }} gutterBottom>
                Get In Touch
              </Typography>
              <JobApplication />
            </Grid>
          </Grid>
        </Box>

        <Testimonials />
      </Container>
    </Box>
    </>
  )
}

export default Careers

