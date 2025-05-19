
import { Container, Typography, Box, Grid, 
} from "@mui/material"
import Testimonials from "../common/testimonial"
import { PageBanner } from '../common/banner/page-banner';
import CustomButton from "../common/button"
import AssociateForm from "./form"

const BecomeAssociate = () => {
  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Become a Paragone Associate'  breadcrumbs={[{ label: "Home", href: "/" }, { label: "Become a Paragone Associate" }]} />

      <Container maxWidth="lg" sx={{ py:5}}>
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
            The beginning of building a solid real estate career starts with being part of a brand with cutting edge global standards and delivery. The <span style={{fontWeight:700}}> Paragóne Signature </span> brand has been designed for the ambitious real estate professional like you who want to build and advance their real estate career with the right organization. Now there’s no stopping you! 
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
                     <Typography variant="h3" sx={{fontWeight:700, fontSize:'2rem'}}  gutterBottom>
                       Let's achieve your real estate goals together
                     </Typography>
                   </Grid>
                   <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                   <a href='#join-form'>
                     <CustomButton sx={{width:160}}>
                       Join Us
                     </CustomButton>
                     </a>
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
            <Typography variant="body1" fontWeight={600} fontSize={18} marginBottom={1.5}>
              Access to the best and the most Promising Listings
            </Typography>
            <Typography variant="body1" color='text.secondary' paragraph>
            We strive to ensure that we offer you not just a variety of property listings to aid your sales, but we also ensure the verification of all property listings, enabling you to present your clients with the best offers to choose from. By joining our team, you will have access to an exclusive portfolio of verified properties, giving you a competitive edge in the market. We are dedicated to supporting your success by providing you with the resources, tools, and opportunities you need to excel in your real estate career.
            </Typography>

            <Box sx={{ mt: 2}}>
              <Typography  variant="body1" fontWeight={600} fontSize={18} marginBottom={1.5}>
                Extensive Training and Development
              </Typography>
              <Typography variant="body1" color='text.secondary' paragraph>
              Our team is dedicated to your success through ongoing training, mentorship, and comprehensive resources. We provide you with the tools and knowledge needed to excel in real estate, ensuring you can close transactions seamlessly and grow your career effectively.
              </Typography>

              <Typography  variant="body1" fontWeight={600} fontSize={18} marginBottom={1.5}>
                Marketing and Branding Support
              </Typography>
              <Typography variant="body1" color='text.secondary'>
              Leverage our established brand and marketing resources, including targeted campaigns, personalized materials, and a strong online presence, to attract clients and properties. Our comprehensive support enhances your visibility, builds your reputation, and gives you a competitive edge.
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
            <a href='#join-form'>
            <CustomButton sx={{ mt: 2, width:150 }}>
              Join now
            </CustomButton>
            </a>
          </Box>
        </Box>
        <Grid container spacing={6} alignItems="center" sx={{ my: 1, position: 'relative' }}>
  <Grid item xs={12} sm={7}>
    <Typography variant="h4" component="h2" gutterBottom>
      No-Ceiling Earning Potential
    </Typography>
    <Typography variant="body1" paragraph>
    At Paragóne Signature & Associates, there are no limits to how much you can earn daily, weekly, monthly, or annually. Here, you are challenged to break through any barriers and elevate your performance to achieve your personal financial goals and desires—no matter how ambitious they are!
    </Typography>
    <a href='#join-form'>
    <CustomButton sx={{ mt: 1, width: '20%', py: 1 }}>
      Join Us
    </CustomButton>
    </a>
  </Grid>

  <Grid item xs={12} sm={5} sx={{ position: 'relative' }}>
    {/* Blob Background */}
    <Box
      component="img"
      src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1744173537/Vector_3_bt1imc.svg"
      alt="Decorative blob"
      sx={{
        position: "absolute",
        top: "48px",
        right: "-20px",
        zIndex: 1,
        width: "90%",
        height: "auto",
        pointerEvents: "none",
        display:{xs:'none', md:'block'}
      }}
    />
    
    {/* Foreground Image */}
    <Box
      component="img"
      src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882223/side-view-adult-male-enjoying-view-from-home_1_amgaev.png"
      alt="Successful real estate agent"
      sx={{
        position: 'relative',
        zIndex: 10,
        width: "100%",
        height: "auto",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    />
  </Grid>
</Grid>


        <Grid container spacing={6} alignItems="center" sx={{ my: 4, postion:'relative', zIndex:10 }}>
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
          <Grid item xs={12} md={7} sx={{ postion:'relative', zIndex:99 }}>
            <Typography variant='subtitle1' marginBottom={1} color='primary.main'>Global Reach</Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              Join A Like-minded Team - Hungry for Success
            </Typography>
            <Typography variant="body1" paragraph>
            Working with like-minded people is a no-brainer because doing so helps you work smarter and engage the power of leverage. It increases your chances for success with a greater probability of achieving your desires. You also connect for beneficial resources and have access to coaches and mentors within the real estate space who can offer that handholding experience as you build your career.
            </Typography>
            <a href='#join-form'>
            <CustomButton  sx={{ mt: 1, width:'20%', py:1 }}>
              Join us
            </CustomButton>
            </a>
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center" sx={{ my: 4, position:'relative' }}>
          <Grid item xs={12} md={7} sx={{ postion:'relative', zIndex:10 }}>
          <Typography variant='subtitle1' marginBottom={1} color='primary.main'>Become an international force</Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              Collaborate with Top Real Estate Professionals
            </Typography>
            <Typography variant="body1" paragraph>
            Connect with a vast network of industry professionals and peers, sharing valuable insights, collaborating on projects, and expanding your business. Leverage these connections to enhance your knowledge, stay ahead of trends, and drive your real estate success.
            </Typography>
            <a href='#join-form'>
            <CustomButton  sx={{ mt: 1, width:'20%', py:1  }}>
              Join Us
            </CustomButton>
            </a>
          </Grid>
          <Grid item xs={12} md={5} sx={{postion:'relative'}}>
            {/* Blob Background */}
    <Box
      component="img"
      src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1744173567/Vector_2_gnqbae.svg"
      alt="Decorative blob"
      sx={{
        position: "absolute",
        top: "20px",
        left: "-10px",
        zIndex: 1,
        width: "45%",
        height: "auto",
        pointerEvents: "none",
        display:{xs:'none', sm:'block'}
      }}
    />
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741882216/working-from-home-ergonomic-workstation_1_pdbmc7.png"
              alt="Professional real estate agent"
              sx={{
                position: 'relative',
                zIndex: 10,
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>
        </Container>
        <Box component='section' id='join-form' sx={{ my: 8, pt: 6, p: 10, backgroundColor: "secondary.main", borderRadius: 2,  postion:'relative', zIndex:99  }}>
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

