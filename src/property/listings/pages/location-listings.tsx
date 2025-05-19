import { useState, useEffect } from "react";
import { Container, Box, Typography, Stack, Button, Drawer, Grid, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageBanner } from "../../../common/banner/page-banner";
import PropertyGrid from "../components/property-layout";
import Testimonials from "../../../common/testimonial";
import PropertyFilter from "../components/property-filter";
// import CustomButton from "../../../common/button";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import type { ListingsQueryParams } from "../../types";

import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { fetchListings } from "../../../redux/slices/listings-slice";

const LocationListings = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const decodedLocationId = decodeURIComponent(locationId || "");
 const isMobile = useMediaQuery("(max-width: 900px)");
  const dispatch = useAppDispatch();
  const listings = useAppSelector((state) => state.listings);
  
  const { properties, totalCount, loading, currentPage, pageSize } = listings || { 
    properties: [], 
    totalCount: 0, 
    loading: true, 
    currentPage: 1, 
    pageSize: 6
  };

  const [filters, setFilters] = useState({ location: decodedLocationId });
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    dispatch(fetchListings(filters));
  }, [dispatch, filters, currentPage, pageSize]);

  const handleFilterChange = (newFilters: ListingsQueryParams) => {
    setFilters({ ...newFilters, location: decodedLocationId });
  };

  const filterOptions = [
    { value: "all", label: "All properties", icon: <HouseIcon /> },
    { value: "sale", label: "For Sale", icon: <HomeWorkIcon /> },
    { value: "rent", label: "For Rent", icon: <ApartmentIcon /> },
  ];

  const handleFilterOptions = (value: string) => {
    setActiveFilter(value);
  };

  const filteredProperties = properties.filter((property) => {
    if (property.location !== decodedLocationId) return false;
    if (activeFilter === "sale") return property.listingType === "For Sale";
    if (activeFilter === "rent") return property.listingType === "For Rent";
    return true;
  });
  return (
    <Box sx={{ width: "100vw" }}>
       <PageBanner
        title={`Selected Properties in ${decodedLocationId}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Listings", href: "/listings" },
          { label:` Selected Properties in ${decodedLocationId}` },
        ]}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredProperties.length} results out of {totalCount}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 4, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: 1 }}>
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeFilter === option.value ? "contained" : "outlined"}
                onClick={() => handleFilterOptions(option.value)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 2,
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
          
        </Box>

        <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            <PropertyFilter 
              onFilterChange={handleFilterChange} 
              initialFilters={{ ...filters, location: decodedLocationId }}
              showListingTypeFilter={true} 
            />
          </Box>
        </Drawer>

         <Grid container spacing={4}>
        
           {!isMobile && (
                      <Grid item xs={12} md={3}>
                        <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} showListingTypeFilter={true} />
                      </Grid>
                    )}
                    <Grid item xs={12} md={9}>
          <PropertyGrid
            properties={filteredProperties}
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={pageSize}
            loading={loading}
            emptyMessage={`No properties found in ${decodedLocationId} matching your criteria.`}
          />
          </Grid>
        </Grid>
      </Container>

      <Testimonials />
    </Box>
  );
};

export default LocationListings;
