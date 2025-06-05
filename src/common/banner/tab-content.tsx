import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  FormControl,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, Link } from 'react-router-dom';
import {AvailableLocationAutocomplete} from '../available-locations';
import { propertyTypes } from '../../constant';

type ListingsQueryParams = {
  location?: string;
  propertyCategory?: string;
  bedrooms?: string;
};

type TabContentProps = {
  tabIndex?: number;
};

export default function TabContent({ tabIndex }: TabContentProps) {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ListingsQueryParams>({
    defaultValues: {
      location: '',
      propertyCategory: '',
      bedrooms: '',
    },
  });

  const onSubmit = (data: ListingsQueryParams) => {
    const queryParams = new URLSearchParams(
      Object.entries(data)
        .filter(([ val]) => val !== '')
        .map(([k, v]) => [k, String(v)])
    );
    navigate(`/listings/filter?${queryParams.toString()}`);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {tabIndex === 3 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
               <Typography variant="h6" sx={{mb:1}}>
                                   Location
                                 </Typography>
              <AvailableLocationAutocomplete
                    control={control} errors={'field cannot be empty'}
                  />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#FFA500',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Search now
            </Button>
          </Box>
          <Box
            component={Link}
            to="/listings/filter"
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', md: 'auto' },
              justifyContent: 'flex-end',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              Advanced search
            </Typography>
            <IconButton size="small" color="primary">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{mb:1}}>
                                   Location
                                 </Typography>
                  <AvailableLocationAutocomplete
                    control={control} errors={'field cannot be empty'}
                  />
              
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Typography variant="h6" sx={{ mb: 1}}>
                  Property Type
                </Typography>
                <Controller
                  name="propertyCategory"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor:'white',
                        color:'#000',
                        width: '100%',
                      }}
                    >
                      <option value="">Select Property Type</option>
                      {propertyTypes.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Select Rooms
                </Typography>
                <Controller
                  name="bedrooms"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor:'white',
                        color:'#000',
                        width: '100%',
                      }}
                    >
                      <option value="">Select rooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
                    </select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#FFA500',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                py: 1,
                px: 3,
              }}
            >
              Search now
            </Button>
            <Box
              component={Link}
              to="/listings/filter"
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', md: 'auto' },
                justifyContent: { xs: 'flex-end', md: 'flex-start' },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: 'black', cursor: 'pointer' }}
              >
                Advanced search
              </Typography>
              <IconButton size="small" color="primary">
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}
