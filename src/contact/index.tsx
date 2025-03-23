"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  List,
  ListItem,
  ListItemText,
//   useTheme,
//   useMediaQuery,
} from "@mui/material"
import {
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material"
import { PageBanner } from "../common/banner/page-banner"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  reason: string
  message: string
}

const Contact = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, reason: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <Box sx={{width:'100vw'}}>
     <PageBanner title='Contact Us' currentPage='Contact Us' />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: "100%", backgroundColor: "background.paper", borderRadius: 2 }}>
              <List sx={{display:'flex', flexDirection:'column', gap:3, "& .MuiListItem-root": { px: 0 } }}>
              <ListItem sx={{display:'flex', alignItems:'flex-start', gap:2, border:'1px solid #ddd', borderRadius:'10px', px:3, py:2}}>
              <img src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742485281/Group_72_qagsym.svg' width='45px' height='45px' alt='email icon' style={{marginLeft:10, marginTop:4}} />
                 
                  <ListItemText
                    primary="Address:"
                    secondary="7, Sola Gbadayi Street, off 21 Road, Gowon Estate, Lagos."
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      gutterBottom: true,
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                  />
                </ListItem>

                <ListItem sx={{display:'flex', alignItems:'flex-start', gap:2, border:'1px solid #ddd', borderRadius:'10px', px:3, py:2}}>
                <img src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742485285/Group_73_ajvzu6.svg' width='45px' height='45px' alt='email icon' style={{marginLeft:10, marginTop:4}} />
                  <ListItemText
                    primary="Email:"
                    secondary={
                      <>
                        <Typography variant="body1" component="div">
                          support@paragonesignature.com
                        </Typography>
                        <Typography variant="body1" component="div">
                          info@paragonesignature.com
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      gutterBottom: true,
                    }}
                  />
                </ListItem>

                <ListItem sx={{display:'flex', alignItems:'flex-start', gap:2, border:'1px solid #ddd', borderRadius:'10px', px:3, py:2}}>
                <img src='https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742485283/Group_74_ptl10t.svg' width='45px' height='45px' alt='email icon' style={{marginLeft:10, marginTop:4}} />
                  <ListItemText
                    primary="Phone number:"
                    secondary={
                      <>
                        <Typography variant="body1" component="div">
                          (+234) 916 046 7439
                        </Typography>
                        <Typography variant="body1" component="div">
                          (+234) 915 636 2645
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      gutterBottom: true,
                    }}
                  />
                </ListItem>
              </List>

              <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                  href="https://wa.me/2349160467439"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: "50px",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#25D366",
                    "&:hover": {
                      backgroundColor: "#128C7E",
                    },
                  }}
                >
                  Chat on WhatsApp
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, backgroundColor: "background.paper", borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Leave Us a Message
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
                      <InputLabel id="reason-label">Choose a reason</InputLabel>
                      <Select
                        labelId="reason-label"
                        name="reason"
                        value={formData.reason}
                        onChange={handleSelectChange}
                        label="Choose a reason"
                        required
                      >
                        <MenuItem value="general">General Inquiry</MenuItem>
                        <MenuItem value="property">Property Information</MenuItem>
                        <MenuItem value="partnership">Partnership Opportunities</MenuItem>
                        <MenuItem value="career">Career Opportunities</MenuItem>
                        <MenuItem value="support">Technical Support</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                      Send message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, borderRadius: 2, overflow: "hidden", height: 500 }}>
          <iframe
            title="Paragone Signature Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3!2d3.3!3d6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJOIDPCsDE4JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Contact;

