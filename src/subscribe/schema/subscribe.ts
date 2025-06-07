import { z } from 'zod';

// const landmarkSchema = z.object({
//   name: z.string().min(1, 'Landmark name is required'),
//   category: z.string().min(1, 'Category is required'),
// });

const propertySchema = z.object({
  propertyName: z.string().min(1, 'Property name is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  propertyDocuments: z.array(z.instanceof(File)),
  location: z.string().min(1, 'Location is required'),
  landmarks: z.array(z.string()),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  propertyImages: z.array(z.instanceof(File)).min(1, 'At least one property image is required'),
});

export const sellAsCompanySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  officeAddress: z.string().min(1, 'Office address is required'),
  cacDocument: z.array(z.instanceof(File)).min(1, 'CAC document is required'),
  phoneNumber: z.string().regex(
    /^(?:\+?[1-9]\d{0,3})?\d{10,14}$/,
    'Invalid phone number'
  ),
  email: z.string().email('Invalid email address'),
  contactMethod: z.enum(['email', 'phone']),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  package: z.enum(['Beginners', 'Pro', 'Enterprise', 'Advanced']),
  properties: z.array(propertySchema).min(1, 'At least one property is required'),
});