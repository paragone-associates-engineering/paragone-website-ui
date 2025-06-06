
import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import { z } from 'zod';
import { sellAsCompanySchema } from './schema/subscribe';
import type { Property, SellAsCompany } from './types';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomButton from '../common/button';
import { PropertyForm } from './add-property';

const CONTACT_METHODS = ['email', 'phone'];
const PACKAGES = ['Beginners', 'Pro', 'Enterprise', 'Advance'];

export const SellAsCompanyForm = ({selectedPkg}:{selectedPkg: string}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    officeAddress: '',
    cacDocument: [] as File[],
    phoneNumber: '',
    email: '',
    contactMethod: 'email',
    state: '',
    country: '',
    package: selectedPkg || '',
    properties: [
      {
        propertyName: '',
        propertyType: '',
        propertyDocuments: [],
        location: '',
        landmarks: [{ "name": "Mall", "category": "school" }],
        description: '',
        propertyImages: [],
      }
    ] as Property[],
  });

  useEffect(() => {
    if (selectedPkg) {
      setFormData((prev) => ({ ...prev, package: selectedPkg }));
    }
  }, [selectedPkg]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
   // console.log(formData);
    const submitFormData = new FormData();
  
    try {
      const validatedData: SellAsCompany = sellAsCompanySchema.parse(formData);
  
      const newProperties: Omit<Property, "propertyDocuments" | "propertyImages">[] = [];
  
      validatedData.properties.forEach((property) => {
        const { propertyDocuments, propertyImages, ...rest } = property;
  
        propertyDocuments?.forEach((file, docIndex) => {
          submitFormData.append(`propertyDocuments${property.propertyName}[${docIndex}]`, file);
        });
  
        propertyImages?.forEach((file, imgIndex) => {
          submitFormData.append(`propertyImages${property.propertyName}[${imgIndex}]`, file);
        });
  
        newProperties.push(rest);
      });
  
     
      submitFormData.append(
        "metadata",
        JSON.stringify({
          companyName: validatedData.companyName,
          officeAddress: validatedData.officeAddress,
          phoneNumber: validatedData.phoneNumber,
          email: validatedData.email,
          contactMethod: validatedData.contactMethod,
          state: validatedData.state,
          country: validatedData.country,
          package: validatedData.package,
          properties: newProperties,
        })
      );
  
      // Append CAC documents
      validatedData.cacDocument.forEach((file, index) => {
        submitFormData.append(`cacDocument[${index}]`, file);
      });
  
      //console.log("Not submitted data", submitFormData);
  
      // Submit form data
      await axios.post(
        "https://paragone-website-backend.onrender.com/form/sell-as-company",
        submitFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success('Form submitted Successfully. Thank you for subscribing')
      console.log("Form submitted successfully", submitFormData);
      setFormData({
        companyName: "",
        officeAddress: "",
        cacDocument: [] as File[],
        phoneNumber: "",
        email: "",
        contactMethod: "email",
        state: "",
        country: "",
        package: selectedPkg,
        properties: [
          {
            propertyName: "",
            propertyType: "",
            propertyDocuments: [],
            location: "",
            landmarks: [],
            description: "",
            propertyImages: [],
          },
        ], // Reset properties with one default property
      });
  
    } catch (error) {
      console.log("Failed to submit");
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        toast.error('Failed to submit. Please try again')
      }
    } finally{
      setIsLoading(false)
    }
  };

  const handlePropertyAdd = () => {
    setFormData((prev) => ({
      ...prev,
      properties: [
        ...prev.properties,
        {
          propertyName: '',
          propertyType: '',
          propertyDocuments: [],
          location: '',
          landmarks: [{ "name": "Mall", "category": "school" }],
          description: '',
          propertyImages: [],
        },
      ],
    }));
  };

  const handlePropertyUpdate = (index: number, property: Property) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.map((p, i) => (i === index ? property : p)),
    }));
  };

  const handlePropertyRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index),
    }));
  };

  return (
   
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, bgcolor:'secondary.main', py:8,px:1 }}>
         <Container maxWidth="md">
        <Typography variant="h5" sx={{mb:3}} gutterBottom>
        Let’s get started
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
        Company Name
        </Typography>
            <TextField
              fullWidth
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              error={!!errors['companyName']}
              helperText={errors['companyName']}
            />
          </Grid>

          <Grid item xs={12}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
       Office Address
        </Typography>
            <TextField
              fullWidth
              placeholder="Office Address"
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              error={!!errors['officeAddress']}
              helperText={errors['officeAddress']}
            />
          </Grid>

          <Grid item xs={12}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
        CAC Document
        </Typography>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              //startIcon={<CloudUploadIcon />}
              sx={{bgcolor:'white',height:55, mb: 1, display:'flex', justifyContent:'space-between' }}
            >
             <CloudUploadIcon />
             <Typography  sx={{flex:1, textAlign:'center'}}> Upload CAC Document </Typography>
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData({ ...formData, cacDocument: Array.from(e.target.files) });
                  }
                }}
              />
            </Button>
            {formData.cacDocument.length > 0 && (
              <Typography variant="caption" display="block">
                {formData.cacDocument.length} documents selected
              </Typography>
            )}
            {errors['cacDocument'] && (
              <Typography color="error" variant="caption" display="block">
                {errors['cacDocument']}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
        Phone Number
        </Typography>
            <TextField
              fullWidth
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              error={!!errors['phoneNumber']}
              helperText={errors['phoneNumber']}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
        Email
        </Typography>
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors['email']}
              helperText={errors['email']}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Contact Method</InputLabel>
              <Select
                value={formData.contactMethod}
                label="Contact Method"
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
              >
                {CONTACT_METHODS.map((method) => (
                  <MenuItem key={method} value={method}>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Package</InputLabel>
              <Select
                value={formData.package}
                label="Package"
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
              >
                {PACKAGES.map((pkg) => (
                  <MenuItem key={pkg} value={pkg}>
                    {pkg}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
       State
        </Typography>
            <TextField
              fullWidth
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              error={!!errors['state']}
              helperText={errors['state']}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{mb:1}} gutterBottom>
        Country
        </Typography>
            <TextField
              fullWidth
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              error={!!errors['country']}
              helperText={errors['country']}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', my:2}}>
            <Typography variant="h5" gutterBottom>
              Property Details
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={handlePropertyAdd}
              sx={{py:1, bgcolor:'white' }}
            >
              Add Property
            </Button>
            
            </Box>
            {formData.properties.map((property, index) => (
              <PropertyForm
                key={index}
                property={property}
                index={index}
                onUpdate={handlePropertyUpdate}
                onRemove={handlePropertyRemove}
              />
            ))}
           
          </Grid>

          <Grid item xs={12}>
            <CustomButton
            isLoading={isLoading}
              sx={{ mt: 2, width:'100%', py:1 }}
            >
              Submit
            </CustomButton>
          </Grid>
        </Grid>
        </Container>
      </Box>
    
  );
};