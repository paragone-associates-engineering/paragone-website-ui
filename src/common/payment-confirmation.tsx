import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Container, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';
import { API_BASE_URL } from '../services/api';

type VerificationStatus = 'loading' | 'success' | 'failed';

const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState<string>('');
  const hasFetched = useRef(false); // Prevent duplicate calls in dev

  useEffect(() => {
    const reference = searchParams.get('reference');

    const verifyPayment = async () => {
      if (!reference) {
        setStatus('failed');
        setMessage('No transaction reference found.');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/payment/verify?reference=${reference}`);
        if (res.status === 200) {
          setStatus('success');
          setMessage('Your payment was successful. A confirmation email has been sent.');
        } else {
          setStatus('failed');
          setMessage('Payment verification failed. Please contact support.');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setStatus('failed');
        setMessage('An error occurred while verifying your payment.');
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      verifyPayment();
    }
  }, [searchParams]);

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" textAlign="center">
        {status === 'loading' && (
          <>
            <CircularProgress color="primary" />
            <Typography mt={2}>Verifying your payment...</Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleOutlineIcon fontSize="large" color="primary" />
            <Typography variant="h5" mt={2}>
              Payment Successful!
            </Typography>
            <Typography mt={1} color="text.secondary">
              {message}
            </Typography>
          </>
        )}

        {status === 'failed' && (
          <>
            <ErrorOutlineIcon fontSize="large" color="error" />
            <Typography variant="h5" mt={2}>
              Payment Failed
            </Typography>
            <Typography mt={1} color="text.secondary">
              {message}
            </Typography>
          </>
        )}

        {status !== 'loading' && (
          <Button variant="contained" color="primary" sx={{ mt: 4 }} href="/">
            Go back home
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default PaymentConfirmation;
