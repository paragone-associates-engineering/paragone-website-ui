"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Stack,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  // useTheme,
  // useMediaQuery,
} from "@mui/material"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"
import { PageBanner } from "../common/banner/page-banner"
import { faqs, ReferralFormData } from "./data"
import Testimonials from "../common/testimonial"
import ReferralSteps from "./components/referral-steps"



const ReferAndEarn = () => {
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [formData, setFormData] = useState<ReferralFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    message: "",
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, profession: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
   
  }

  return (
    <Box sx={{width:'100vw'}}>
     <PageBanner title='Refer and Earn With Us' currentPage="Refer and Earn with us" />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={5}  sx={{ justifyContent: "center", alignItems: "center" }}>
         
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474444/business-people-shaking-hands-agreement_1_cmkjwm.png"
              alt="Network connections"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Typography variant="h3" component="h1" gutterBottom>
              Unlock the Power of Your Network
            </Typography>
            <Typography variant="body1" paragraph>
              At Paragone Signature & Associates, we believe in the strength of community and the power of personal
              connections. Our referral program allows you to leverage your network to help clients and contribute to
              us, all while earning you well- attractive rewards & commissions. Whether you know someone looking to buy,
              sell, or manage a property, your referrals can help them find the perfect solution while rewarding you.
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Simple Steps to Refer-And-Earn
          </Typography>

          <ReferralSteps />
        </Box>

        <Grid container spacing={6} alignItems="center" sx={{ my: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Join and Earn
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Trusted Expertise
              </Typography>
              <Typography variant="body1" paragraph>
                As one of the preferred professional services that many clients in Nigeria rely on, we ensure your
                referrals are in good hands.
              </Typography>

              <Typography variant="h6" component="h3" gutterBottom>
                Attractive Rewards
              </Typography>
              <Typography variant="body1" paragraph>
                Earn significant rewards for every successful referral. The more you refer, the more you earn.
              </Typography>

              <Typography variant="h6" component="h3" gutterBottom>
                Easy Process
              </Typography>
              <Typography variant="body1">
                Our streamlined referral process makes it easy for you to refer clients and track your rewards.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474428/company-employee-pacing-around-startup-office-unews-using-device_1_ppbyxy.png"
              alt="Successful business meeting"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ my: 10 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742474418/img_oc0bjx.png"
                alt="Person working on laptop"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  //boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" gutterBottom>
                Join Our Referral Program
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
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

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="profession-label">Your profession</InputLabel>
                      <Select
                        labelId="profession-label"
                        name="profession"
                        value={formData.profession}
                        onChange={handleSelectChange}
                        label="Your profession"
                        required
                      >
                        <MenuItem value="real-estate">Real Estate Agent</MenuItem>
                        <MenuItem value="broker">Property Broker</MenuItem>
                        <MenuItem value="consultant">Business Consultant</MenuItem>
                        <MenuItem value="other">Other Professional</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional comments"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                      Submit Now
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" sx={{textAlign:'center'}} gutterBottom>
            How Refer-And-Earn Works (FAQs)
          </Typography>

          <Box sx={{ mt: 4 }}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  backgroundColor: "background.paper",
                  border:'1px solid #ddd',
                  "&:not(:last-child)": { mb: 2 },
                  borderRadius: "8px !important",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    borderRadius: 2,
                    
                    "&.Mui-expanded": {
                        border:'0px ',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  }}
                >
                  <Typography variant="h6" component="h3">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{mx:2, borderTop: '1px solid #ddd', py:3}}>
                  <Typography variant="body1">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

       <Testimonials />
      </Container>
    </Box>
  )
}

export default ReferAndEarn

