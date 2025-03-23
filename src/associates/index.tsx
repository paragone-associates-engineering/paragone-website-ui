"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"
import Testimonials from "../common/testimonial"
import { PageBanner } from '../common/banner/page-banner';
import CustomButton from "../common/button"

interface AssociateFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  experience: string
  currentCompany: string
  whyJoin: string
  hearAboutUs: string
}

const BecomeAssociate: React.FC = () => {

  const [formData, setFormData] = useState<AssociateFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    currentCompany: "",
    whyJoin: "",
    hearAboutUs: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    
  }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Become An Associate'  currentPage="become an associate" />

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
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              Apply Now
            </Button>
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
            <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
              Learn more
            </Button>
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
            <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
              Learn more
            </Button>
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
            <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
              Learn more
            </Button>
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

        <Box sx={{ my: 8, pt: 6, px: 4, backgroundColor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Are you ready?
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
            Fill out the form below to express your interest in joining our team. Our recruitment team will contact you
            shortly after reviewing your application. We look forward to meeting you!
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="experience-label">Years of experience</InputLabel>
                  <Select
                    labelId="experience-label"
                    name="experience"
                    value={formData.experience}
                    onChange={handleSelectChange}
                    label="Years of experience"
                    required
                  >
                    <MenuItem value="0-1">0-1 years</MenuItem>
                    <MenuItem value="1-3">1-3 years</MenuItem>
                    <MenuItem value="3-5">3-5 years</MenuItem>
                    <MenuItem value="5-10">5-10 years</MenuItem>
                    <MenuItem value="10+">10+ years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current company (if applicable)"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Why do you want to join our team?"
                  name="whyJoin"
                  multiline
                  rows={4}
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="How did you hear about us?"
                  name="hearAboutUs"
                  multiline
                  rows={2}
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                  Submit Application
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Testimonials />
      </Container>
    </Box>
  )
}

export default BecomeAssociate

