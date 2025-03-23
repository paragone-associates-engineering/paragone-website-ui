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
  //ToggleButtonGroup,
  //ToggleButton,

} from "@mui/material"
import type { PropertyRequestFormData } from "../types";
import { PageBanner } from '../../common/banner/page-banner';
import Testimonials from '../../common/testimonial';
import { propertyTypes, locations, priceRanges, contactMethods } from "../data";
import { CustomToggleButton, CustomToggleButtonGroup } from "../../common/toggle-button";

const PropertyRequest = () => {
 
 const [formData, setFormData] = useState<PropertyRequestFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    location: "",
    lowestPrice: "",
    highestPrice: "",
    contactMethod: "",
    additionalComments: "",
    purpose: "buy",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePurposeChange = (_event: React.MouseEvent<HTMLElement>, newPurpose: "buy" | "rent" | "short-stay") => {
    if (newPurpose !== null) {
      setFormData((prev) => ({ ...prev, purpose: newPurpose }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <Box  sx={{width:'100vw'}}>
     <PageBanner 
         title="Property Request" 
         currentPage="property-request"/>
     

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dv0mdoa6b/image/upload/v1741867698/microsoft-edge-_eCnLJWQXMg-unsplash_1_dmpqrj.png"
              alt="Person searching for property"
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
              Find Your Perfect Property with Paragóne Signature & Associates Ltd.
            </Typography>
            <Typography variant="body1" paragraph>
              We understand that finding the perfect property requires a personalized approach. Whether you're seeking a
              luxury residence, a prime commercial space, or a unique investment opportunity, our dedicated team is here
              to help.
            </Typography>
            <Typography variant="body1" paragraph>
              Our experienced professionals work diligently to match you with properties that meet your specific needs
              and preferences drawing from our access to an extensive range of properties across Nigeria.
            </Typography>
            <Typography variant="body1">
              Let us take the stress out of your property search and guide you towards finding your ideal property with
              Paragóne Signature & Associates Ltd. Your journey to the perfect property starts here.
            </Typography>
          </Grid>
        </Grid>
        </Container>

        <Box sx={{ py: 8, backgroundColor:"secondary.main" }} >
        <Container maxWidth="md" >
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Request a property
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
            Do you have specific features you require in your property of choice, please leave us a message and we'll
            get across to you with properties matching your preferences.
          </Typography>

          <Paper elevation={0} sx={{ p: 4, backgroundColor: "secondary.main", borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <CustomToggleButtonGroup
                  value={formData.purpose}
                  exclusive
                  onChange={handlePurposeChange}
                  aria-label="property purpose"
                  fullWidth
                >
                  <CustomToggleButton  value="buy" aria-label="buy property">
                    Buy
                  </CustomToggleButton>
                  <CustomToggleButton value="rent" aria-label="rent property">
                    Rent
                  </CustomToggleButton>
                  <CustomToggleButton  value="short-stay" aria-label="short stay">
                    Short stay
                  </CustomToggleButton>
                </CustomToggleButtonGroup>
              </Box>

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
                    <InputLabel id="property-type-label">Property type</InputLabel>
                    <Select
                      labelId="property-type-label"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleSelectChange}
                      label="Property type"
                      required
                    >
                      {propertyTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      name="location"
                      value={formData.location}
                      onChange={handleSelectChange}
                      label="Location"
                      required
                    >
                      {locations.map((loc) => (
                        <MenuItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="lowest-price-label">Lowest price</InputLabel>
                    <Select
                      labelId="lowest-price-label"
                      name="lowestPrice"
                      value={formData.lowestPrice}
                      onChange={handleSelectChange}
                      label="Lowest price"
                    >
                      {priceRanges.map((price) => (
                        <MenuItem key={price.id} value={price.value}>
                          {price.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="highest-price-label">Highest price</InputLabel>
                    <Select
                      labelId="highest-price-label"
                      name="highestPrice"
                      value={formData.highestPrice}
                      onChange={handleSelectChange}
                      label="Highest price"
                    >
                      {priceRanges.map((price) => (
                        <MenuItem key={price.id} value={price.value}>
                          {price.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="contact-method-label">Preferred method of contact</InputLabel>
                    <Select
                      labelId="contact-method-label"
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleSelectChange}
                      label="Preferred method of contact"
                    >
                      {contactMethods.map((method) => (
                        <MenuItem key={method.id} value={method.id}>
                          {method.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional comments"
                    name="additionalComments"
                    multiline
                    rows={4}
                    value={formData.additionalComments}
                    onChange={handleInputChange}
                    placeholder="Write comments here"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                    Send request
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          </Container>
        </Box>
       
<Container maxWidth='lg'>
       <Testimonials />
      </Container>
    </Box>
  )
}

export default PropertyRequest

