"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material"
import { PageBanner } from "../common/banner/page-banner"
import { jobData } from "./data"
import { ApplicationFormData } from "./types"

const JobDetail = () => {
  
  const [formData, setFormData] = useState<ApplicationFormData>({
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
      <PageBanner title={jobData.title} currentPage={`Careers / ${jobData.title}`}/>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          We are hiring: {jobData.title}
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Job details
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ width: "30%", fontWeight: "bold", color: "primary.main" }}
                  >
                    Job title
                  </TableCell>
                  <TableCell>{jobData.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Department
                  </TableCell>
                  <TableCell>{jobData.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    Location
                  </TableCell>
                  <TableCell>{jobData.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    General job description
                  </TableCell>
                  <TableCell>{jobData.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Duties and Responsibilities
          </Typography>

          <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {jobData.duties.map((duty, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  {duty}
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            SKILLS/ATTRIBUTES
          </Typography>

          <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
            <Grid container spacing={2}>
              {jobData.skills.map((skill, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {skill.title}:
                  </Typography>
                  <Typography variant="body2">{skill.description}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            EDUCATION/EXPERIENCE REQUIREMENTS
          </Typography>

          <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Educational Background:
                </Typography>
                <Typography variant="body2" paragraph>
                  {jobData.education.educational}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Experience:
                </Typography>
                <Typography variant="body2" paragraph>
                  {jobData.education.experience}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  HR Certification:
                </Typography>
                <Typography variant="body2" paragraph>
                  {jobData.education.certification}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Preferred:
                </Typography>
                <Typography variant="body2">{jobData.education.preferred}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="body2">
            Interested candidates should submit their CVs to:{" "}
            <Typography component="span" fontWeight="bold">
              {jobData.email}
            </Typography>{" "}
            before {jobData.deadline}.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
            Note: Only qualified candidates will be contacted.
          </Typography>
        </Box>

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
                Apply Now
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
                      <InputLabel id="department-label">Your profile type</InputLabel>
                      <Select
                        labelId="department-label"
                        name="department"
                        value={formData.department}
                        onChange={handleSelectChange}
                        label="Your profile type"
                        required
                      >
                        <MenuItem value="select-department">Select department</MenuItem>
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
      </Container>
    </Box>
  )
}

export default JobDetail

