"use client"

import { useState, useEffect } from "react"
import { Container, Box, Typography, Stack, Button, Drawer } from "@mui/material"
import { useParams } from "react-router-dom";
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGrid from "../components/property-layout"
import Testimonials from "../../../common/testimonial"
import PropertyFilter from "../components/property-filter"
import type { PropertyFilter as PropertyFilterType } from "../types"
import { propertiesData } from "../../../constant";
import { FilterOption, PropertyData } from "../../../types/properties";
import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CustomButton from "../../../common/button";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const LocationListings = () => {
  const { locationId } = useParams<{ locationId: string }>()
  const [properties, setProperties] = useState<PropertyData[]>(propertiesData)
  const [filters, setFilters] = useState<PropertyFilterType>({})
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(propertiesData.length)
 const [activeFilter, setActiveFilter] = useState<string>('all');
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 
 const toggleDrawer = (open: boolean) => {
   setIsDrawerOpen(open);
 };
    const filterOptions: FilterOption[] = [
      { value: "all", label: "All properties", icon: <HouseIcon /> },
      //{ value: "location", label: "Location", icon: <LocationOnIcon /> },
      { value: "sale", label: "For sale", icon: <HomeWorkIcon /> },
      { value: "rent", label: "For rent", icon: <ApartmentIcon /> },
      //{ value: "short_stay", label: "Short stay", icon: <HomeWorkIcon /> },
      //{ value: "land", label: "Land", icon: <TerrainIcon /> },
    ];

     const handleFilterOptions = (value: string) => {
    
      if (value !== null) {
        setActiveFilter(value);
            }
    };
  
  const getLocationName = (id: string): string => {
    const locationMap: Record<string, string> = {
      ikouji: "Ikouji",
      lekki: "Lekki",
      chevron: "Chevron",
      "eko-atlantic-city": "Eko Atlantic City",
      vic: "VIC",
      "victoria-island": "Victoria Island",
      "banana-island": "Banana Island",
      epe: "Epe",
      ajah: "Ajah",
      "bodo-lekki": "Bodo Lekki",
      ikoyi: "Ikoyi",
      mojo: "Mojo",
    }

    return locationMap[id || ""] || "Unknown Location"
  }

  const locationName = getLocationName(locationId || "")

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const filteredProperties = propertiesData.filter((property) => {
        // Apply location filter
        if (locationId && property.location.city.toLowerCase() !== locationName.toLowerCase()) {
          return false
        }

        // Apply listing type filter
        if (filters.listingType && property.type !== filters.listingType) {
          return false
        }

        if (filters.propertyType && property.propertyType !== filters.propertyType) {
          return false
        }

        if (filters.minPrice && property.price < filters.minPrice) {
          return false
        }
        if (filters.maxPrice && property.price > filters.maxPrice) {
          return false
        }

        if (filters.minBeds && property.bedrooms < filters.minBeds) {
          return false
        }
        if (filters.minBaths && property.bathrooms < filters.minBaths) {
          return false
        }


        if (filters.minArea && property.sqm < filters.minArea) {
          return false
        }
        if (filters.maxArea && property.sqm > filters.maxArea) {
          return false
        }

        return true
      })

      setProperties(filteredProperties)
      setTotalCount(filteredProperties.length)
      setLoading(false)
    }

    fetchProperties()
  }, [locationId, filters, locationName])

  const handleFilterChange = (newFilters: PropertyFilterType) => {
    setFilters(newFilters)
  }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner
        title={`Selected Properties in ${locationName}`}
        currentPage='listings locations'
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {properties.length} results out of {totalCount}
          </Typography>
        </Box>

<Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>


<Box sx={{ display: 'flex', justifyContent: 'center', my: 4, flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: 1 }}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "contained" : "outlined"}
          onClick={() => handleFilterOptions(option.value)}
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
    <CustomButton variant="outline" startIcon={FilterAltIcon} onClick={() => toggleDrawer(true)}>
       Filter
      </CustomButton>
    </Box>

    <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} showListingTypeFilter={true} />
          </Box>
        </Drawer>
        {/* <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} showListingTypeFilter={true} />
          </Grid> */}


          <Box >
            <PropertyGrid
              totalCount={totalCount}
              currentPage={1}
              itemsPerPage={6}
              loading={loading}
              emptyMessage={`No properties found in ${locationName} matching your criteria.`}
            />
          </Box>
        
      </Container>

      <Testimonials />
    </Box>
  )
}

export default LocationListings

