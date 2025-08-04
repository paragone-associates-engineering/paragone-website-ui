import type React from 'react';
import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, EventAvailable as EventIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { applyToEvent } from '../../redux/slices/events-slice';
import type { Event, EventApplication } from '../../types/events';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import toast from 'react-hot-toast';
import { Feature } from '../../types/management';

interface EventApplicationFormProps {
  event: Event;
}

const EventApplicationForm = ({ event }: EventApplicationFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { applicationLoading, applicationSuccess, error } = useAppSelector(state => state.events);

  const [formData, setFormData] = useState<EventApplication>({
    //eventId: event.id,
    applicantName: {
      first: '',
      lastName: '',
    },
    email: '',
    phoneNumber: '',
    eventType: 'inPerson',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.applicantName.first.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.applicantName.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(prev[parent as keyof EventApplication] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const applicationData = { ...formData };

    // if paid, initialize transaction
    const rawAmount = applicationData.eventType === 'inPerson' ? event.price?.inPerson?.amount : event.price?.virtual?.amount;

    if (event.isPaid && rawAmount) {
      const amountInSmallestUnit = Math.round(rawAmount * 100); // Always multiply by 100 for kobo, centts, etc.

      const initializedTransaction = await axios.post(`${API_BASE_URL}/payment/initialize`, {
        amount: amountInSmallestUnit,
        currency: applicationData.eventType === 'inPerson' ? event.price?.inPerson?.currency : event.price?.virtual?.currency,
        email: applicationData.email,
        metadata: { feature: Feature.EVENT, ...applicationData, eventId: event.id },
      });

      const { authorization_url } = initializedTransaction.data;

      window.location.href = authorization_url;
    } else dispatch(applyToEvent({ eventId: event.id, application: applicationData }));

    if (applicationSuccess) {
      setFormData({
        applicantName: { first: '', lastName: '' },
        email: '',
        phoneNumber: '',
        eventType: 'inPerson',
      });

      toast.success('Form submitted successfully!');
    }
  };

  const getPrice = () => {
    if (!event.isPaid) return null;

    const price = formData.eventType === 'inPerson' ? event.price?.inPerson : event.price?.virtual ?? event.price?.inPerson;

    return price;
  };

  const price = getPrice();

  if (applicationSuccess) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <EventIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Application Submitted Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Thank you for applying to {event.title}. You will receive a confirmation email shortly.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/events')}>
            Apply to Another Event
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ py: 4, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <EventIcon color="primary" />
          <Typography variant="h5" fontWeight={600}>
            Event Application
          </Typography>
        </Box>

        {event.isPaid && price && (
          <Alert severity="info" sx={{ mb: 3, px: 1 }}>
            <Typography variant="body2">
              This is a paid event. Registration fee:{' '}
              <strong>
                {price.currency} {price.amount}
              </strong>
            </Typography>
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.applicantName.first}
              onChange={e => handleInputChange('applicantName.first', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.applicantName.lastName}
              onChange={e => handleInputChange('applicantName.lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Box>

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={e => handleInputChange('phoneNumber', e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
              Attendance Type
            </FormLabel>
            <RadioGroup value={formData.eventType} onChange={e => handleInputChange('eventType', e.target.value)} row>
              <FormControlLabel
                value="inPerson"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>In Person</span>
                    {event.eventType === 'inPerson' && <Chip label="Available" size="small" color="success" />}
                  </Box>
                }
                disabled={event.eventType !== 'inPerson' && event.eventType !== 'hybrid'}
              />
              <FormControlLabel
                value="virtual"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Virtual</span>
                    {event.eventType === 'virtual' && <Chip label="Available" size="small" color="success" />}
                  </Box>
                }
                disabled={event.eventType !== 'virtual' && event.eventType !== 'hybrid'}
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={applicationLoading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {applicationLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `${event.isPaid ? 'Complete Registration' : 'Apply for Free'}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventApplicationForm;
