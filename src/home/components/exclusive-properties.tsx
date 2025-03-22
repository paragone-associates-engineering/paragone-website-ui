import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid2,
  Button,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TerrainIcon from "@mui/icons-material/Terrain";

import { propertiesData } from "../../constant";
import { FilterOption } from "../../types/properties";
import PropertyCard from "../../common/property-card";
import CustomButton from "../../common/button";

const filterOptions: FilterOption[] = [
  { value: "all", label: "All properties", icon: <HouseIcon /> },
  { value: "location", label: "Location", icon: <LocationOnIcon /> },
  { value: "sale", label: "For sale", icon: <HomeWorkIcon /> },
  { value: "rent", label: "For rent", icon: <ApartmentIcon /> },
  { value: "short_stay", label: "Short stay", icon: <HomeWorkIcon /> },
  { value: "land", label: "Land", icon: <TerrainIcon /> },
];
const ExclusiveProperties = () => {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const handleFilterChange = (value: string) => {
      
      if (value !== null) {
        setActiveFilter(value);
            }
    };

  const filteredProperties = propertiesData.filter((property) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "sale" && property.type === "sale") return true;
    if (activeFilter === "rent" && property.type === "rent") return true;
    return false;
  });

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mb={2}>
        <Typography variant="overline" color="primary" fontWeight="bold">
          Featured listing
        </Typography>
        <Typography variant="h4" component="h2" fontWeight="bold" mb={2}>
          Exclusive Properties Tailored for You
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          sx={{ maxWidth: "800px", mx: "auto" }}
        >
          Our featured listings are meticulously chosen to meet the highest
          standards of luxury and comfort thereby satisfying your Real Estate
          needs and fulfilling your investment aspirations. Here's a glimpse of
          what we offer:
        </Typography>
      </Box>

<Box sx={{ display: 'flex', justifyContent: 'center', my: 4, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: 1 }}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "contained" : "outlined"}
          onClick={() => handleFilterChange(option.value)}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 2,
            minWidth: { xs: '45%', sm: 'auto' },
            mb: { xs: 1, md: 0 },
            bgcolor: activeFilter === option.value ? '#ffa726' : 'white',
            color: activeFilter === option.value ? 'white' : 'inherit',
            borderColor: '#e0e0e0',
            '&:hover': {
              bgcolor: activeFilter === option.value ? '#fb8c00' : '#f5f5f5',
              borderColor: '#e0e0e0'
            },
            boxShadow: activeFilter === option.value ? 2 : 0,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: activeFilter === option.value ? 'white' : '#757575',
            }}>
              {option.icon}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: activeFilter === option.value ? 'bold' : 'normal' }}>
              {option.label}
            </Typography>
          </Stack>
        </Button>
      ))}
    </Box>

      
      <Grid2 container spacing={2}>
        {filteredProperties.map((property) => (
          <Grid2 size={{xs:12, sm:6, md:4}}  key={property.id}>
            <PropertyCard property={property} />
          </Grid2>
        ))}
      </Grid2>

      <Box display="flex" justifyContent="center" mt={6}>
        <CustomButton href='/listings' sx={{px:5, py:1.5}}>Browse more Properties</CustomButton>
      </Box>
    </Container>
  );
};

export default ExclusiveProperties;
