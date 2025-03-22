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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
//   useTheme,
//   useMediaQuery,
} from "@mui/material";
import Testimonials from "../../common/testimonial";
import { PageBanner } from "../../common/banner/page-banner";
import { approaches, services } from "../data";
import { ManagementFormData } from "../types";

const PropertyManagement: React.FC = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [formData, setFormData] = useState<ManagementFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    location: "",
    message: "",
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
    // In a real application, this would submit the form data to an API
    console.log("Form submitted:", formData)
    // Show success message or redirect
  }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner title='Property Management' currentPage='property management'/>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481159/new-home-keys-plan-table-with-defocused-couple_1_kper2m.png" 
              alt="Property management team" 
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Hassle-Free Property Ownership, Maximum Returns
            </Typography>
            <Typography variant="body1" paragraph>
              Discovering and managing properties should be an exhilarating endeavor, not a burdensome task. Paragone Signature & Associates Ltd. aids you in finding properties that fit your investment goals and managing them effectively. We handle all aspects of property management, from tenant screening to maintenance, ensuring your investment income flows hassle-free. Enjoy the benefits of property ownership without the daily headaches.
            </Typography>
            <Typography variant="body1">
              Our property management services are designed to optimize your investment's value while minimizing your workload. We support through tenant screening to ensure reliable tenants, regular maintenance to preserve property value, and efficient rent collection to keep your property in prime condition.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center" sx={{ my: 8 }}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Approach
            </Typography>
            
            <Grid container spacing={3}>
              {services.map((approach, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {approach.title}
                      </Typography>
                      <Typography variant="body2">
                        {approach.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Learn more
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481156/apartment-building-city-with-copy-space_1_edxvmz.png"
              alt="Modern apartment building"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={6} alignItems="center" sx={{ my: 8 }}>
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481147/sadiq-ali-LfRn3yxsrQo-unsplash_1_xwavv3.png"
              alt="Modern apartment building"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Approach
            </Typography>
            
            <Grid container spacing={3}>
              {approaches.map((approach, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {approach.title}
                      </Typography>
                      <Typography variant="body2">
                        {approach.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Learn more
            </Button>
          </Grid>
        </Grid>
        
        <Box sx={{ my: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box 
                component="img" 
                src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1742481142/img_1_o7rnja.png" 
                alt="Lekki-Ikoyi Link Bridge" 
                sx={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                  //boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }} 
              />
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" gutterBottom>
                Start your hassle-free property management journey today
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
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="property-type-label">Property type</InputLabel>
                      <Select
                        labelId="property-type-label"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleSelectChange}
                        label="Property type"
                        required
                      >
                        <MenuItem value="residential">Residential</MenuItem>
                        <MenuItem value="commercial">Commercial</MenuItem>
                        <MenuItem value="mixed-use">Mixed-use</MenuItem>
                        <MenuItem value="industrial">Industrial</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="location-label">Select location</InputLabel>
                      <Select
                        labelId="location-label"
                        name="location"
                        value={formData.location}
                        onChange={handleSelectChange}
                        label="Select location"
                        required
                      >
                        <MenuItem value="lagos">Lagos</MenuItem>
                        <MenuItem value="abuja">Abuja</MenuItem>
                        <MenuItem value="ph">Port Harcourt</MenuItem>
                        <MenuItem value="ibadan">Ibadan</MenuItem>
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
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      size="large"
                    >
                      Get started
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

export default PropertyManagement

