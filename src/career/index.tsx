"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import Testimonials from "../common/testimonial"
import { PageBanner } from '../common/banner/page-banner';
import { jobOpenings } from "./data"
import { ContactFormData } from "./types"

const Careers = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinProfile: "",
    department: "",
    resume: null,
    message: "",
    agreeToPolicy: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    
  }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Career' currentPage="Career" />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>
        </Container>

        <Box sx={{ my: 8, bgcolor:"secondary.main", py:8 }}>
        <Container maxWidth="lg" >
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Current Openings
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4}}>
            {jobOpenings.map((job) => (
              <Grid item xs={12} md={4} key={job.id}>
                <Card elevation={0} sx={{ height: "100%", borderRadius: 2, backgroundColor: "background.paper" }}>
                  <CardContent sx={{ px: 4, textAlign: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <Box
                        component="img"
                        src={job.icon}
                        alt={job.title}
                        sx={{
                          width: 80,
                          height: 80,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {job.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button variant="contained" color="primary" size="large" href={`/careers/${job.id}`}>
                      Apply now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Container>
        </Box>
        <Container maxWidth="lg">
        <Box sx={{ my: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741899341/img_xizehs.png"
                alt="Modern desk with plant"
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
                Get In Touch
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
                    <TextField
                      fullWidth
                      label="LinkedIn profile"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="department-label">Department</InputLabel>
                      <Select
                        labelId="department-label"
                        name="department"
                        value={formData.department}
                        onChange={handleSelectChange}
                        label="Department"
                        required
                      >
                        <MenuItem value="marketing">Marketing</MenuItem>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="operations">Operations</MenuItem>
                        <MenuItem value="admin">Administration</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Upload your resume/CV
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{
                        height: 56,
                        justifyContent: "flex-start",
                        textTransform: "none",
                        color: formData.resume ? "text.primary" : "text.secondary",
                      }}
                    >
                      {formData.resume ? formData.resume.name : "Drag and drop upload your file"}
                      <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    </Button>
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
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.agreeToPolicy}
                          onChange={handleCheckboxChange}
                          name="agreeToPolicy"
                          required
                        />
                      }
                      label="I agree to Paragone Signature recruitment policy"
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

        <Testimonials />
      </Container>
    </Box>
  )
}

export default Careers

