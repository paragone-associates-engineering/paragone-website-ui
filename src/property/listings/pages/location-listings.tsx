"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Box, Typography, Grid } from "@mui/material"
import { useParams } from "react-router-dom";
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGrid from "../components/property-layout"
//import RegionsGrid from "../components/regions-layout"
import Testimonials from "../../../common/testimonial"
//import PageBanner from "../components/PageBanner"
//import PropertyGrid from "../components/listings/Property-lyout"
import PropertyFilter from "../components/property-filter"
//import Testimonials from "../components/Testimonials"
import type { Property, PropertyFilter as PropertyFilterType } from "../types"

// Mock properties data - would be fetched from API in a real application
const mockProperties: Property[] = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: `property-${index + 1}`,
    title:
      index % 3 === 0
        ? "Ipsum qui in commodo nulla"
        : index % 3 === 1
          ? "Quis duis velit sunt voluptate minim"
          : "Voluptate adipisicing adipisicing",
    price: 120000 + index * 50000,
    pricePerSqm: 1500,
    location: {
      address: "238 Highgate Road",
      city: "London",
      coordinates: {
        lat: 51.5074,
        lng: -0.1278,
      },
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 1650,
      parking: index % 2 === 0,
      wifi: true,
      cableTV: true,
      elevator: index % 3 === 0,
    },
    description:
      "Lorem ipsum dolor sit amet consectetur. Morbi quis feugiat odio vel vehicula. Praesent pulvinar in lorem eget. Et consequat sed aliquam pulvinar aliquam enim. Duis feugiat neque ut efficitur pulvinar nulla accumsan vitae eu efficitur.",
    images: [
      `/property-${index + 1}.jpg`,
      `/property-${index + 2 > 9 ? index - 7 : index + 2}.jpg`,
      `/property-${index + 3 > 9 ? index - 6 : index + 3}.jpg`,
      `/property-${index + 4 > 9 ? index - 5 : index + 4}.jpg`,
    ],
    propertyType: index % 4 === 0 ? "apartment" : index % 4 === 1 ? "house" : index % 4 === 2 ? "land" : "commercial",
    listingType: index % 3 === 0 ? "sale" : index % 3 === 1 ? "rent" : "short-stay",
    rating: 4.9,
    reviewCount: 12,
    featured: index < 3,
    constructionYear: 2020,
  }))

const LocationListings: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>()
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [filters, setFilters] = useState<PropertyFilterType>({})
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(mockProperties.length)

  // Get location name from ID - in a real app, this would come from an API
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

  // Simulate API call to fetch properties based on location and filters
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Filter properties based on location and other filters
      // In a real app, this would be an API call
      const filteredProperties = mockProperties.filter((property) => {
        // Apply location filter
        if (locationId && property.location.city.toLowerCase() !== locationName.toLowerCase()) {
          return false
        }

        // Apply listing type filter
        if (filters.listingType && property.listingType !== filters.listingType) {
          return false
        }

        // Apply property type filter
        if (filters.propertyType && property.propertyType !== filters.propertyType) {
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
        if (filters.minBeds && property.features.bedrooms < filters.minBeds) {
          return false
        }

        // Apply bathrooms filter
        if (filters.minBaths && property.features.bathrooms < filters.minBaths) {
          return false
        }

        // Apply area filter
        if (filters.minArea && property.features.area < filters.minArea) {
          return false
        }
        if (filters.maxArea && property.features.area > filters.maxArea) {
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

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} showListingTypeFilter={true} />
          </Grid>

          <Grid item xs={12} md={9}>
            <PropertyGrid
              properties={properties}
              totalCount={totalCount}
              currentPage={1}
              itemsPerPage={6}
              loading={loading}
              emptyMessage={`No properties found in ${locationName} matching your criteria.`}
            />
          </Grid>
        </Grid>
      </Container>

      <Testimonials />
    </Box>
  )
}

export default LocationListings

