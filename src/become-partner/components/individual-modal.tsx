import React, { useState, FormEvent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  SxProps,
  Theme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define types for the CustomButton props
interface CustomButtonProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  [key: string]: any; // For any other props that might be passed
}

// CustomButton component with TypeScript
const CustomButton: React.FC<CustomButtonProps> = ({ children, sx, ...props }) => (
  <Button 
    variant="contained" 
    color="primary" 
    sx={{ 
      borderRadius: 2, 
      fontWeight: 'bold',
      ...sx 
    }} 
    {...props}
  >
    {children}
  </Button>
);

// Define form data interface
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  contactMethod: string;
  contactTime: string;
  sellTime: string;
  comments: string;
}

export const ContactFormModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Initialize form data with empty values
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    address: '',
    contactMethod: '',
    contactTime: '',
    sellTime: '',
    comments: ''
  });

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
    handleClose();
  };

  return (
    <Box>
      
      <CustomButton sx={{ py: 1, px: 5 }} onClick={handleOpen}>
        Get Started
      </CustomButton>

     
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: 'background.default',
            maxWidth:'700px',
            width: '100%',
            m: { xs: 1, sm: 2, md: 3 }
          }
        }}
      >
        <DialogTitle sx={{ pt: 3, pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h2" fontWeight="bold">
              Connect with us
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>First name</Typography>
                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="James"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Last name</Typography>
                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Franklin"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Email address</Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="james@mail.com"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Phone number</Typography>
                <TextField
                  fullWidth
                  name="phone"
                  placeholder="+00 123 456 789"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Property type</Typography>
                <TextField
                  select
                  fullWidth
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value="">Any type</MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="land">Land</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Address</Typography>
                <TextField
                  fullWidth
                  name="address"
                  placeholder="Address here"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Preferred Method of Contact</Typography>
                <TextField
                  select
                  fullWidth
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value="">Any type</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>Best Time to Contact</Typography>
                <TextField
                  select
                  fullWidth
                  name="contactTime"
                  value={formData.contactTime}
                  onChange={handleChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value="">Any time</MenuItem>
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>When do you want to sell</Typography>
                <TextField
                  select
                  fullWidth
                  name="sellTime"
                  value={formData.sellTime}
                  onChange={handleChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value="">This month</MenuItem>
                  <MenuItem value="next_month">Next month</MenuItem>
                  <MenuItem value="3_months">Within 3 months</MenuItem>
                  <MenuItem value="6_months">Within 6 months</MenuItem>
                  <MenuItem value="year">Within a year</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>Additional Comments</Typography>
                <TextField
                  fullWidth
                  name="comments"
                  multiline
                  rows={4}
                  placeholder="Write comments here"
                  variant="outlined"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    bgcolor: 'warning.main',
                    color: 'common.white',
                    '&:hover': {
                      bgcolor: 'warning.dark',
                    },
                    borderRadius: 1,
                    fontSize: '1rem',
                  }}
                >
                  Send message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};