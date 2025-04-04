import { useState } from 'react';
import { 
  Box, 
  Button, 
  //Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Paper, 
  Select, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { z } from 'zod';
import dayjs from 'dayjs'; 
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../../services/api';
//import dayjs from 'dayjs'; Zod schemas for validation
const Step1Schema = z.object({
  date: z.date(),
  viewingType: z.enum(['In-person', 'Via Video Chat'])
});

const Step2Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address')
});

// Types based on Zod schemas
type Step1Data = z.infer<typeof Step1Schema>;
type Step2Data = z.infer<typeof Step2Schema>;

// Combined form data type
interface FormData extends Step1Data, Step2Data {}

const BookViewingForm  = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    date: dayjs(new Date()).toDate(),
    viewingType: 'In-person',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNextStep = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
  
    try {
      Step1Schema.parse({
        date: formData.date,
        viewingType: formData.viewingType,
      });
  
      setStep(2);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Validate step 2 data
      Step2Schema.parse({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email
      });
      
      const submissionData = {
        date: formData.date?.toISOString(),
        viewingType: formData.viewingType,
        name: {
          first: formData.firstName,
          lastName: formData.lastName
        },
        phoneNumber: formData.phoneNumber,
        email: formData.email
      };
      
      console.log('Submitting data:', submissionData);
      
      // Here you would typically make the API call
      await fetch(`${API_BASE_URL}/form/book-viewing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      
      // Reset form after successful submission
      toast.success('Viewing request sent successfully!');
      setStep(1);
      setFormData({
        date:dayjs(new Date()).toDate(),
        viewingType: 'In-person',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
   
      <Paper 
        elevation={3} 
        sx={{ 
          py: 3, 
          px:2,
          bgcolor: '#FFC107', 
          borderRadius: 2,
          color: 'white'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Book a Viewing
        </Typography>
        
        <Box component="form" noValidate sx={{ mt: 2 }}>
          {step === 1 ? (
             <Stack spacing={3}>
             <Box sx={{ display: 'flex', gap: 2 }}>
               <TextField
                 fullWidth
                 placeholder="First Name"
                 variant="outlined"
                 value={formData.firstName}
                 onChange={(e) => handleInputChange('firstName', e.target.value)}
                 error={!!errors.firstName}
                 helperText={errors.firstName}
                 sx={{ bgcolor: 'white', borderRadius: 1 }}
                 required
               />
               <TextField
                 fullWidth
                 placeholder="Last Name"
                 variant="outlined"
                 value={formData.lastName}
                 onChange={(e) => handleInputChange('lastName', e.target.value)}
                 error={!!errors.lastName}
                 helperText={errors.lastName}
                 sx={{ bgcolor: 'white', borderRadius: 1 }}
               />
             </Box>
             
             <TextField
               fullWidth
               placeholder="Phone Number"
               variant="outlined"
               value={formData.phoneNumber}
               onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
               error={!!errors.phoneNumber}
               helperText={errors.phoneNumber}
               sx={{ bgcolor: 'white', borderRadius: 1 }}
             />
             
             <TextField
               fullWidth
               placeholder="Email Address"
               type="email"
               variant="outlined"
               value={formData.email}
               onChange={(e) => handleInputChange('email', e.target.value)}
               error={!!errors.email}
               helperText={errors.email}
               sx={{ bgcolor: 'white', borderRadius: 1 }}
             />
             
               <Button 
                variant="contained" 
                type='submit'
                onClick={handleNextStep}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'secondary.main',
                    color:'#000'
                  }
                }}
                 
               >
                 Next
               </Button>
            
           </Stack>
            
          ) : (
            <Stack spacing={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Dates for Scheduling"
                  value={formData.date ? dayjs(formData.date) : null}
                  onChange={(newValue) => handleInputChange('date', newValue)}
                 // variant="dialog" 
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    minWidth: '100%', 
                  }}
                />
              </LocalizationProvider>
              
              <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: 1 }}>
                <InputLabel id="viewing-type-label">Choose a Method</InputLabel>
                <Select
                  labelId="viewing-type-label"
                  id="viewing-type"
                  value={formData.viewingType}
                  label="Choose a Method"
                  onChange={(e) => handleInputChange('viewingType', e.target.value)}
                >
                  <MenuItem value="In-person">In Person</MenuItem>
                  <MenuItem value="Via Video Chat">Via Video Chat</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', gap: 2 }}>
               <Button 
                 variant="outlined" 
                 onClick={() => setStep(1)}
                 sx={{ 
                   flex: 1,
                   borderColor: 'white', 
                   color: 'white',
                   '&:hover': {
                     borderColor: '#f5f5f5',
                     bgcolor: 'rgba(255,255,255,0.1)',
                   }
                 }}
               >
                 Back
               </Button>
              <Button 
               variant="contained" 
               onClick={handleSubmit}
               sx={{ 
                 flex: 2,
                 bgcolor: '#333', 
                 color: 'white',
                 '&:hover': {
                   bgcolor: '#555',
                 }
               }}
              >
               Send Request
              </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Paper>
   
  );
};

export default BookViewingForm;