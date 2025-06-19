import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid2,
  Button,
  Stack,
} from "@mui/material";
//import LocationOnIcon from "@mui/icons-material/LocationOn";
import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
 import TerrainIcon from "@mui/icons-material/Terrain";

import { FilterOption } from "../types/properties";
import PropertyCard from "./property-card";
import CustomButton from "./button";
import SkeletonLoader from "./skeleton-loader";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { fetchListings } from "../redux/slices/listings-slice";

const filterOptions: FilterOption[] = [
  { value: "all", label: "All properties", icon: <HouseIcon /> },
  //{ value: "location", label: "Location", icon: <LocationOnIcon /> },
  { value: "For Sale", label: "For sale", icon: <HomeWorkIcon /> },
 { value: "For Rent", label: "For rent", icon: <ApartmentIcon /> },
  { value: "Short Stay", label: "Short stay", icon: <HomeWorkIcon /> },
  { value: "Land", label: "Land", icon: <TerrainIcon /> },
];

const ExclusiveProperties = () => {
  const dispatch = useAppDispatch()
   const listings = useAppSelector((state) => state.listings)
  
    const { properties, loading, pageSize, currentPage} = listings || {
      properties: [],
      totalCount: 0,
      loading: true,
      currentPage: 1,
      pageSize: 6,
      filters: {},
    }
  
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const handleFilterChange = (value: string) => {
      
      if (value !== null) {
        setActiveFilter(value);
            }
    };

  const filteredProperties = properties?.length > 0 && properties.filter((property) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "For Sale" && property.listingType === "For Sale") return true;
    if (activeFilter === "For Rent" && property.listingType === "For Rent") return true;
     if (activeFilter === "Short Stay" && property.listingType === "Short Stay") return true;
     if (activeFilter === "Land" && property.propertyCategory === "Land") return true;
    return false;
  });

  useEffect(() => {
      dispatch(fetchListings({ page: currentPage, pageSize }))
    }, [dispatch, currentPage, pageSize]);

  return (
   
      <Box sx={{bgcolor:'secondary.main', py:5}}>
         <Container maxWidth="lg">
         <Box textAlign="center" mb={2}>
        <Typography variant="subtitle2" color="primary" fontSize= '0.875rem' fontWeight="normal">
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

<Box sx={{ display: 'flex', justifyContent: {xs:'flex-start', sm:'center'}, my: 4, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: 1 }}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "contained" : "outlined"}
          onClick={() => handleFilterChange(option.value)}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 1.5,
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
              //alignItems: 'center', 
              bgcolor:activeFilter === option.value ? 'white' : '#EFF3F5',
              py:0.5,
              px:1,
              borderRadius:1,
              color: activeFilter === option.value ? 'primary.main' : '#757575',
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

      
      <Grid2 container rowSpacing={6} columnSpacing={2}>
      {loading ? (
        <SkeletonLoader count={6} />
      ) : Array.isArray(filteredProperties) && filteredProperties.length > 0 ? (
        filteredProperties.slice(0, 6).map((property) => (
          <Grid2 size={{xs:12, sm:6, md:4}}  key={property.id}>
            <PropertyCard property={property} />
          </Grid2>
        ))
      ) : (
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            width: "100%", 
            mt: 4 
          }}
        >
          
          <Typography variant="h6" color="textSecondary">
            No properties available
          </Typography>
        </Box>
      )}
    </Grid2>

      <Box display="flex" justifyContent="center" mt={6}>
        <CustomButton href='/listings' sx={{px:5, py:1.5}}>Browse more Properties</CustomButton>
      </Box>
    </Container>
    </Box>
  );
};

export default ExclusiveProperties;
