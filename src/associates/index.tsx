
import { Container, Typography, Box, Grid, Button,
} from "@mui/material"
import Testimonials from "../common/testimonial"
import { PageBanner } from '../common/banner/page-banner';
import CustomButton from "../common/button"
import AssociateForm from "./form"

const BecomeAssociate = () => {
  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Become a Paragone Associate'  breadcrumbs={[{ label: "Home", href: "/" }, { label: "Become a Paragone Associate" }]} />

      <Container maxWidth="lg" sx={{ py:{md:6}}}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882251/craig-lovelidge-s-KphF10sWM-unsplash_1_uh3xkz.png"
              alt="Modern conference room"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Do Much More!
            </Typography>
            <Typography variant="body1" paragraph>
              The Paragone Signature is a place where career goals and ambitions of a dedicated real estate professional
              are realized. The Paragone Signature is a place where you can grow and develop your professional skills
              and knowledge, and where you can collaborate with the right people to achieve your goals.
            </Typography>
          </Grid>
        </Grid>

        <Box
                 sx={{
                   my: 8,
                   px: 4,
                   py:6,
                   borderRadius: 2,
                   backgroundColor: "secondary.main",
                   backgroundImage: "url(https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741871622/Mask_group_2_k2b2oe.png)",
                   backgroundRepeat: "no-repeat",
                   backgroundPosition: "center",
                   backgroundSize: "cover",
                 }}
               >
                 <Grid container spacing={2} alignItems="center">
                   <Grid item xs={12} md={8}>
                     <Typography variant="h3" sx={{fontWeight:700}}  gutterBottom>
                       Let's achieve your real estate goals together
                     </Typography>
                   </Grid>
                   <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                     <CustomButton href='/contact-us'>
                       Contact us
                     </CustomButton>
                   </Grid>
                 </Grid>
               </Box>

        <Grid container spacing={6} sx={{ my: 4 }}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882239/young-male-adult-taking-pictures-building_1_dpda6c.png"
              alt="Real estate agent with camera"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              Your Success Just Got Easier With Us
            </Typography>
            <Typography variant="body1" paragraph>
              Access to the best and the most Promising Listings
            </Typography>
            <Typography variant="body1" paragraph>
              We have a large portfolio of exclusive listings that are not available anywhere else. We can increase the
              visibility of properties through strategic use of various marketing channels. We have a dedicated team of
              professionals who are committed to the success of our agents. We have a strong brand that is recognized in
              the market. We are positioned to assist you in all that you need most.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Extensive Training and Development
              </Typography>
              <Typography variant="body1" paragraph>
                Our team is dedicated to your success through ongoing training, mentorship, and professional
                development. We provide comprehensive onboarding for new agents, regular training on the latest industry
                trends, and one-on-one career coaching.
              </Typography>

              <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
                Marketing and Branding Support
              </Typography>
              <Typography variant="body1">
                Leverage our established brand and marketing resources, including targeted campaigns, professional
                photography, and social media management. Our marketing team creates customized strategies to elevate
                your listings, build your reputation, and grow your client base.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            my: 8,
            p: 4,
            borderRadius: 2,
            backgroundImage: "url(https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882231/paul-edesemi-niElH29LKjw-unsplash_1_acbsao.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 2,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, color: "white", textAlign: "center" }}>
          <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741883035/video_rloykg.svg"
              alt="Professional real estate agent"
              />
            <Typography variant="h3" component="h2" gutterBottom>
              Earn more with your new journey
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              Join now
            </Button>
          </Box>
        </Box>

        <Grid container spacing={6} alignItems="center" sx={{ my: 4 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" gutterBottom>
              No-Ceiling Earning Potential
            </Typography>
            <Typography variant="body1" paragraph>
              At Paragone Signature & Associates, we believe in rewarding excellence. Our competitive commission
              structure is designed to maximize your income potential. As you grow through our levels and enhance your
              performance, we offer you generous tiered commission rates to ensure you're always motivated to excel.
            </Typography>
            <CustomButton href='/' sx={{ mt: 1, width:'20%', py:1 }}>
             Join Us
            </CustomButton>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882223/side-view-adult-male-enjoying-view-from-home_1_amgaev.png"
              alt="Successful real estate agent"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center" sx={{ my: 4 }}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882220/male-employee-leaving-office-job-waving-colleaguesunset_1_rsmvwu.png"
              alt="Team meeting"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" gutterBottom>
              Join A Like-minded Team - Hungry for Success
            </Typography>
            <Typography variant="body1" paragraph>
              Become part of an ecosystem that is built on collaboration and mutual success. Our culture fosters
              teamwork, knowledge sharing, and a collective drive to achieve greater standards of excellence and
              service. You'll connect to valuable mentorship opportunities and build lasting professional relationships.
            </Typography>
            <CustomButton  sx={{ mt: 1, width:'20%', py:1 }}>
              Join us
            </CustomButton>
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center" sx={{ my: 4 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" gutterBottom>
              Collaborate with Top Real Estate Professionals
            </Typography>
            <Typography variant="body1" paragraph>
              Connect with our network of highly experienced real estate experts, sharing insights and strategies that
              accelerate your growth. Our collaborative environment creates a culture of continuous learning, expanding
              your knowledge, the depth of clients, and your earning potential.
            </Typography>
            <CustomButton  sx={{ mt: 1, width:'20%', py:1  }}>
              Join Us
            </CustomButton>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882216/working-from-home-ergonomic-workstation_1_pdbmc7.png"
              alt="Professional real estate agent"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>
        </Container>
        <Box sx={{ my: 8, pt: 6, p: 10, backgroundColor: "secondary.main", borderRadius: 2 }}>
          <Container maxWidth='md'>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Are you ready?
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
          If you got this far, it means you're excited. And so are we. Let's set up your one-on-one conversation and start shaping the future of real estate together!
          </Typography>

         <AssociateForm />
          </Container>
        </Box>
       
<Container maxWidth='lg'>
        <Testimonials />
      </Container>
    </Box>
  )
}

export default BecomeAssociate

