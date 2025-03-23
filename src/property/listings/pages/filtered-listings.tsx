"use client"

import { useState, useEffect } from "react"
import { Container, Box, Typography, Grid, Drawer, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { PageBanner } from "../../../common/banner/page-banner"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropertyGrid from "../components/property-layout"
import Testimonials from "../../../common/testimonial"
import PropertyFilter from "../components/property-filter"
import type {  PropertyFilter as PropertyFilterType } from "../types"
import CustomButton from "../../../common/button";
import { propertiesData } from "../../../constant";
import { PropertyData } from "../../../types/properties";

const FilteredListings = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [properties, setProperties] = useState<PropertyData[]>(propertiesData)
  const [filters, setFilters] = useState<PropertyFilterType>({})
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(propertiesData.length)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  
  // Parse query parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const urlFilters: PropertyFilterType = {}

    if (searchParams.has("listingType")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      urlFilters.listingType = searchParams.get("listingType") as any
    }

    if (searchParams.has("propertyType")) {
      urlFilters.propertyType = searchParams.get("propertyType") as string
    }

    if (searchParams.has("location")) {
      urlFilters.location = searchParams.get("location") as string
    }

    if (searchParams.has("minPrice")) {
      urlFilters.minPrice = Number.parseInt(searchParams.get("minPrice") || "0", 10)
    }

    if (searchParams.has("maxPrice")) {
      urlFilters.maxPrice = Number.parseInt(searchParams.get("maxPrice") || "0", 10)
    }

    if (searchParams.has("minBeds")) {
      urlFilters.minBeds = Number.parseInt(searchParams.get("minBeds") || "0", 10)
    }

    if (searchParams.has("minBaths")) {
      urlFilters.minBaths = Number.parseInt(searchParams.get("minBaths") || "0", 10)
    }

    if (searchParams.has("minArea")) {
      urlFilters.minArea = Number.parseInt(searchParams.get("minArea") || "0", 10)
    }

    if (searchParams.has("maxArea")) {
      urlFilters.maxArea = Number.parseInt(searchParams.get("maxArea") || "0", 10)
    }

    setFilters(urlFilters)
  }, [location.search])

  // Update URL when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value.toString())
      }
    })

    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true },
    )
  }, [filters, navigate, location.pathname])

  // Simulate API call to fetch properties based on filters
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 500))

      const filteredProperties = propertiesData.filter((property) => {
      
        if (filters.listingType && property.type !== filters.listingType) {
          return false
        }

        // Apply property type filter
        if (filters.propertyType && property.propertyType !== filters.propertyType) {
          return false
        }

        // Apply location filter
        if (filters.location && property.location.city.toLowerCase() !== filters.location.toLowerCase()) {
          return false
        }

        // Apply price range filter
        if (filters.minPrice && property.price < filters.minPrice) {
          return false
        }
        if (filters.maxPrice && property.price > filters.maxPrice) {
          return false
        }

        // Apply bedrooms filter
        if (filters.minBeds && property.bedrooms < filters.minBeds) {
          return false
        }

        // Apply bathrooms filter
        if (filters.minBaths && property.bathrooms < filters.minBaths) {
          return false
        }

        // Apply area filter
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
  }, [filters])

  const handleFilterChange = (newFilters: PropertyFilterType) => {
    setFilters(newFilters)
  }

  return (
    <Box sx={{width:'100vw'}}>
      <PageBanner
        title="Properties"
        currentPage='filter properties'
      />
<Container maxWidth="lg" sx={{ py: 6 }}>
    <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body2" color="text.secondary">
        Showing {properties.length} results out of {totalCount}
      </Typography>
  

    {isMobile && (
      <CustomButton variant="outline" startIcon={FilterAltIcon} onClick={() => toggleDrawer(true)}>
       Filter
      </CustomButton>
    )}
  </Box>
    <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 300, p: 2 }}>
        <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} showListingTypeFilter={true} />
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
          totalCount={totalCount}
          currentPage={1}
          itemsPerPage={6}
          loading={loading}
          emptyMessage="No properties found matching your criteria."
        />
      </Grid>
    </Grid>
  </Container>

      <Testimonials />
    </Box>
  )
}

export default FilteredListings

