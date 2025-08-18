import type React from 'react';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { applyToResource } from '../../redux/slices/resources-slice';
import type { Resource, CreateResourceApplication } from '../types';
import SuccessModal from './success-modal';
import { API_BASE_URL } from '../../services/api';
import axios from 'axios';
import { Feature } from '../../types/management';

interface ResourceApplicationFormProps {
  resource: Resource;
}

const ResourceApplicationForm = ({ resource }: ResourceApplicationFormProps) => {
  const dispatch = useAppDispatch();
  const { applicationLoading, applicationSuccess, error } = useAppSelector(state => state.resources);

  const [formData, setFormData] = useState<CreateResourceApplication>({
    // resourceId: resource.id,
    applicantName: {
      first: '',
      lastName: '',
    },
    email: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);
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
          ...(prev[parent as keyof CreateResourceApplication] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
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
    const rawAmount = resource.price?.amount;

    if (resource.isPaid && rawAmount) {
      const amountInSmallestUnit = Math.round(rawAmount * 100); // Always multiply by 100 for kobo, centts, etc.

      const initializedTransaction = await axios.post(`${API_BASE_URL}/payment/initialize`, {
        amount: amountInSmallestUnit,
        currency: resource.price?.currency ?? 'NGN',
        email: applicationData.email,
        metadata: { feature: Feature.RESOURCES, ...applicationData, resourceId: resource.id },
      });

      const { authorization_url } = initializedTransaction.data;

      window.location.href = authorization_url;
    } else dispatch(applyToResource({ application: applicationData, resourceId: resource.id }));
    setSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setFormData({
      //resourceId: resource.id,
      applicantName: {
        first: '',
        lastName: '',
      },
      email: '',
      phoneNumber: '',
    });
    setSuccessModalOpen(false);
    setErrors({});
  };

  const getPrice = () => {
    if (!resource.isPaid) return null;
    return resource.price;
  };

  const price = getPrice();

  return (
    <>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <GetAppIcon color="primary" />
            <Typography variant="h5" fontWeight={600}>
              Download Resource
            </Typography>
          </Box>

          {resource.isPaid && price && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                This is a premium resource. Access fee:{' '}
                <strong>
                  {price.currency} {Number(price.amount).toLocaleString('en-US')}
                </strong>
              </Typography>
            </Alert>
          )}

          {!resource.isActive && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                This resource is currently unavailable. You can still submit a request and we'll notify you when it becomes available.
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
              helperText={errors.email || 'The download link will be sent to this email'}
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={applicationLoading || !resource.isActive}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {applicationLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : resource.isPaid ? (
                'Get Premium Resource'
              ) : (
                'Download Free Resource'
              )}
            </Button>

            {!resource.isActive && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                Resource is currently unavailable
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>

      <SuccessModal
        open={successModalOpen && applicationSuccess}
        onClose={handleCloseSuccessModal}
        resourceTitle={resource.title}
        userEmail={formData.email}
      />
    </>
  );
};

export default ResourceApplicationForm;
