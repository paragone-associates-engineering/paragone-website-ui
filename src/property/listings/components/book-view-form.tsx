import { useState } from 'react';
import { 
  Box, 
  Button, 
  //Container, 
  FormControl, 
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
import customParseFormat from 'dayjs/plugin/customParseFormat';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../../services/api';

// Configure dayjs for DD/MM/YYYY format
dayjs.extend(customParseFormat);

// Zod schemas for validation
const Step2Schema = z.object({
  date: z.date(),
  viewingType: z.enum(['In-person', 'Via Video Chat'])
});

const Step1Schema = z.object({
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

const BookViewingForm = ({propertyId}:{propertyId:string}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    date: dayjs(new Date()).toDate(),
    viewingType: 'In-person',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });
  const[loading,setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNextStep = (event: React.FormEvent) => {
  event.preventDefault();

  try {
    // Validate all fields that are filled in step 1
    Step1Schema.parse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email
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
    setLoading(true)
  try {
    Step2Schema.parse({
      date: formData.date,
      viewingType: formData.viewingType
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

    //console.log('Submitting data:', submissionData);

    await fetch(`${API_BASE_URL}/form/book-viewing/${propertyId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });

    toast.success('Viewing request sent successfully!');
    setStep(1);
    setFormData({
      date: dayjs(new Date()).toDate(),
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
  }finally{
    setLoading(false)
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
           <Stack spacing={2}>
           
           <Box sx={{ display: 'flex', gap: 2 }}>
             <Box sx={{ flex: 1 }}>
               {/* <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color:"text.primary" }}>
                 First Name *
               </Typography> */}
               <TextField
                 fullWidth
                 placeholder="First name"
                 variant="outlined"
                 value={formData.firstName}
                 onChange={(e) => handleInputChange('firstName', e.target.value)}
                 error={!!errors.firstName}
                 helperText={errors.firstName}
                 sx={{ bgcolor: 'white', borderRadius: 1 }}
                 InputProps={{ sx: { '& input': { padding: '12px 14px' } } }}
               />
             </Box>
             <Box sx={{ flex: 1 }}>
               {/* <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                 Last Name *
               </Typography> */}
               <TextField
                 fullWidth
                 placeholder="Last name"
                 variant="outlined"
                 value={formData.lastName}
                 onChange={(e) => handleInputChange('lastName', e.target.value)}
                 error={!!errors.lastName}
                 helperText={errors.lastName}
                 sx={{ bgcolor: 'white', borderRadius: 1 }}
                 InputProps={{ sx: { '& input': { padding: '12px 14px' } } }}
               />
             </Box>
           </Box>
           
           <Box>
             {/* <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
               Phone Number *
             </Typography> */}
             <TextField
               fullWidth
               placeholder="Phone number"
               variant="outlined"
               value={formData.phoneNumber}
               onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
               error={!!errors.phoneNumber}
               helperText={errors.phoneNumber}
               sx={{ bgcolor: 'white', borderRadius: 1 }}
               InputProps={{ sx: { '& input': { padding: '12px 14px' } } }}
             />
           </Box>
           
           <Box>
             {/* <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
               Email Address *
             </Typography> */}
             <TextField
               fullWidth
               placeholder="Email address"
               type="email"
               variant="outlined"
               value={formData.email}
               onChange={(e) => handleInputChange('email', e.target.value)}
               error={!!errors.email}
               helperText={errors.email}
               sx={{ bgcolor: 'white', borderRadius: 1 }}
               InputProps={{ sx: { '& input': { padding: '12px 14px' } } }}
             />
           </Box>
           
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
            
            <Box>
              {/* <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Date & Time *
              </Typography> */}
             <LocalizationProvider dateAdapter={AdapterDayjs}>
 <DateTimePicker
   value={formData.date ? dayjs(formData.date) : dayjs().set('hour', 9).set('minute', 0)}
   onChange={(newValue) => handleInputChange('date', newValue)}
   format="DD/MM/YYYY hh:mm A"
   sx={{
     bgcolor: 'white',
     borderRadius: 1,
      minWidth: '100%',
   }}
   slotProps={{
     textField: {
       placeholder: "Select date and time",
       size: 'small',
       fullWidth: true,
       sx: { 
         backgroundColor: 'white', 
         borderRadius: 1,
         '& input': { padding: '12px 14px' }
       }
     },
     popper: {
       modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
       sx: {
         '& .MuiClock-root': {
           '& .MuiClock-clock': {
             '& .MuiClockNumber-root.Mui-disabled': {
               display: 'none'
             }
           }
         }
       }
     },
     digitalClockSectionItem: {
       sx: {
         '&.Mui-disabled': {
           display: 'none'
         }
       }
     }
   }}
   shouldDisableDate={(date) => date.day() === 0}
   minTime={dayjs().set('hour', 9)}
   maxTime={dayjs().set('hour', 16)}
   ampm={true}
   closeOnSelect={true}
   views={['year', 'month', 'day', 'hours', 'minutes']}
   openTo="day"
 />
</LocalizationProvider>
            </Box>
            
            <Box>
              {/* <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Viewing Method *
              </Typography> */}
              <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: 1 }}>
                <Select
                  value={formData.viewingType}
                  onChange={(e) => handleInputChange('viewingType', e.target.value)}
                  displayEmpty
                  sx={{
                    '& .MuiSelect-select': {
                      padding: '12px 14px'
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Choose a viewing method</em>
                  </MenuItem>
                  <MenuItem value="In-person">In Person</MenuItem>
                  <MenuItem value="Via Video Chat">Via Video Chat</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
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
             type='submit'
             disabled={loading}
             sx={{ 
               flex: 2,
               bgcolor: '#333', 
               color: 'white',
               '&:hover': {
                 bgcolor: '#555',
               }
             }}
            >
             {loading ? "Submitting..." : "Send Request"}
            </Button>
            </Box>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default BookViewingForm;