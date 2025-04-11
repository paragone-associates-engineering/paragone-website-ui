import { useState } from 'react';
//import { useRouter } from 'next/router';
import { Box, Grid,  FormControl, InputLabel, Select, MenuItem, Button, Typography, SelectChangeEvent, IconButton } from '@mui/material';
//import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate, Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocations } from '../../hooks/use-locations';

type ListingsQueryParams = {
  location?: string;
  propertyCategory?: string;
  bedrooms?: string | number;
};

type TabContentProps = {
  tabIndex?: number;
};

const TabContent: React.FC<TabContentProps> = ({ tabIndex }) => {
  const navigate = useNavigate();
  const { locations } = useLocations();
  const [filters, setFilters] = useState<ListingsQueryParams>({
    location: '',
    propertyCategory: '',
    bedrooms: '',
  });

  const handleChange = (e: SelectChangeEvent<string>) => {
      const { name, value } = e.target;
      if (name) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      }
    };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(
      Object.entries(filters)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => [key, String(value)])
    );
    navigate(`/listings/filter?${queryParams.toString()}`);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {tabIndex === 3 ? (
        <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{flex: 1}}>
          <FormControl fullWidth>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              name="location"
              value={filters.location}
              onChange={handleChange}
            >
               {locations.map((location:string, index:number) => (
                  <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
            ))}
            </Select>
          </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ bgcolor: '#FFA500', color: 'white', textTransform: 'none', fontWeight: 'bold' }}
          >
            Search now
          </Button>
        </Box>
        <Box component={Link} to='/listings/filter' sx={{mt:2, display: 'flex', alignItems: 'center', width: { xs: '100%', md: 'auto' }, justifyContent: 'flex-end' }}>
          <Typography variant="body2" sx={{color:'black', cursor: 'pointer' }}>
            Advanced search
          </Typography>
          <IconButton size="small" color="primary">
            <MoreVertIcon />
          </IconButton>
        </Box>
        </Box>
      ) : (
        <Box>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              name="location"
              value={filters.location}
              onChange={handleChange}
            >
            {locations.map((location, index) => (
                  <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
            ))}
            </Select>
          </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="property-label">Property Category</InputLabel>
              <Select
                labelId="property-label"
                name="propertyCategory"
                value={filters.propertyCategory}
                onChange={handleChange}
              >
                <MenuItem value="">Select type</MenuItem>
                <MenuItem value="residential">Residential</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
                <MenuItem value="land">Land</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="room-label">Select Rooms</InputLabel>
              <Select
                labelId="room-label"
                name="bedrooms"
                value={filters.bedrooms?.toString() || ''}
                onChange={handleChange}
              >
                <MenuItem value="">Select rooms</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
         
        </Grid>
        
        <Box
      sx={{
        display: 'flex',
         justifyContent: 'space-between',
        alignItems: 'center',
         flexDirection: { xs: 'column', md: 'row' },
        mt: 2
      }}
    >
         <Button
            variant="contained"
            //fullWidth
            onClick={handleSearch}
            sx={{ bgcolor: '#FFA500', color: 'white', textTransform: 'none', fontWeight: 'bold',py:1, px:3 }}
          >
            Search now
          </Button>
          <Box component={Link} to='/listings/filter' sx={{mt:2, display: 'flex', alignItems: 'center', width: { xs: '100%', md: 'auto' }, justifyContent: { xs: 'flex-end', md: 'flex-start' } }}>
          <Typography variant="body2" sx={{color:'black', cursor: 'pointer' }}>
            Advanced search
          </Typography>
          <IconButton size="small" color="primary">
            <MoreVertIcon />
          </IconButton>
        </Box>
    </Box>
        </Box>
      )}
    </Box>
  );
};

export default TabContent;
