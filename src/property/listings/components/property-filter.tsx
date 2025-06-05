"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Typography, Button, Slider, Paper, Select, MenuItem, type SelectChangeEvent } from "@mui/material"
import { Home as HomeIcon, Apartment as ApartmentIcon, Business as BusinessIcon } from "@mui/icons-material"
import { CustomToggleButtonGroup, CustomToggleButton } from "../../../common/toggle-button"
import type { ListingsQueryParams } from "../../../types/properties"
import { useLocations } from "../../../hooks/use-locations"

interface PropertyFilterProps {
  onFilterChange: (filters: ListingsQueryParams) => void
  initialFilters?: ListingsQueryParams
  compact?: boolean
  showListingTypeFilter?: boolean
}

const PropertyFilter = ({
  onFilterChange,
  initialFilters = {},
  compact = false,
  showListingTypeFilter = true,
}: PropertyFilterProps) => {
  const { locations } = useLocations()
  const [filters, setFilters] = useState<ListingsQueryParams>(initialFilters)
  const [priceRange, setPriceRange] = useState<number[]>([
    initialFilters.amountFrom || 500000,
    initialFilters.amountTo || 5000000000,
  ])
  const [areaRange, setAreaRange] = useState<number[]>([initialFilters.areaFrom || 0, initialFilters.areaTo || 100000])

  useEffect(() => {
    setFilters(initialFilters)
    setPriceRange([initialFilters.amountFrom || 500000, initialFilters.amountTo || 5000000000])
    setAreaRange([initialFilters.areaFrom || 0, initialFilters.areaTo || 100000])
  }, [initialFilters])

  const handleListingTypeChange = (_event: React.MouseEvent<HTMLElement>, newListingType: string | null) => {
    if (newListingType) {
      const updatedFilters = { ...filters, listingType: newListingType }
      setFilters(updatedFilters)
      onFilterChange(updatedFilters)
    }
  }

  const handleBedsChange = (_event: React.MouseEvent<HTMLElement>, beds: string | null) => {
    const updatedFilters = { ...filters }
    if (beds === "Any") {
      delete updatedFilters.bedrooms
    } else if (beds === "5+") {
      updatedFilters.bedrooms = 5
    } else if (beds) {
      updatedFilters.bedrooms = Number.parseInt(beds, 10)
    }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleBathsChange = (_event: React.MouseEvent<HTMLElement>, baths: string | null) => {
    const updatedFilters = { ...filters }
    if (baths === "Any") {
      delete updatedFilters.bathrooms
    } else if (baths === "5+") {
      updatedFilters.bathrooms = 5
    } else if (baths) {
      updatedFilters.bathrooms = Number.parseInt(baths, 10)
    }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
  }

  const handlePriceChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    const updatedFilters = { ...filters, amountFrom: min, amountTo: max }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleAreaChange = (_event: Event, newValue: number | number[]) => {
    setAreaRange(newValue as number[])
  }

  const handleAreaChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    const updatedFilters = { ...filters, areaFrom: min, areaTo: max }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    const updatedFilters = { ...filters }

    if (value === "") {
      delete updatedFilters[name as keyof ListingsQueryParams]
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedFilters[name as keyof ListingsQueryParams] = value as any
    }

    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleReset = () => {
    const resetFilters: ListingsQueryParams = {}
    setFilters(resetFilters)
    setPriceRange([500000, 5000000000])
    setAreaRange([0, 10000])
    onFilterChange(resetFilters)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (compact) {
    return (
      <Box sx={{ mb: 4 }}>
        {showListingTypeFilter && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <CustomToggleButtonGroup
              value={filters.listingType || ""}
              exclusive
              onChange={handleListingTypeChange}
              aria-label="listing type"
            >
              <CustomToggleButton value="For Sale" aria-label="for sale">
                <HomeIcon sx={{ mr: 1 }} />
                For sale
              </CustomToggleButton>
              <CustomToggleButton value="For Rent" aria-label="for rent">
                <ApartmentIcon sx={{ mr: 1 }} />
                For rent
              </CustomToggleButton>
              <CustomToggleButton value="Short Stay" aria-label="short stay">
                <BusinessIcon sx={{ mr: 1 }} />
                Short stay
              </CustomToggleButton>
            </CustomToggleButtonGroup>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Paper elevation={0} sx={{ backgroundColor: "secondary.main", borderRadius: 4, border: "1px solid #ddd" }}>
      <Typography variant="h5" sx={{ bgcolor: "white", borderRadiusTop: 4, p: 2 }} gutterBottom>
        Advanced search
      </Typography>

      <Box sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filter by features
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Beds
          </Typography>
          <CustomToggleButtonGroup
            value={filters.bedrooms === undefined ? "Any" : filters.bedrooms === 5 ? "5+" : filters.bedrooms.toString()}
            exclusive
            onChange={handleBedsChange}
            aria-label="beds"
            size="small"
            fullWidth
          >
            <CustomToggleButton value="Any">Any</CustomToggleButton>
            <CustomToggleButton value="1">1+</CustomToggleButton>
            <CustomToggleButton value="2">2+</CustomToggleButton>
            <CustomToggleButton value="3">3+</CustomToggleButton>
            <CustomToggleButton value="4">4+</CustomToggleButton>
            <CustomToggleButton value="5+">5+</CustomToggleButton>
          </CustomToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Baths
          </Typography>
          <CustomToggleButtonGroup
            value={
              filters.bathrooms === undefined ? "Any" : filters.bathrooms === 5 ? "5+" : filters.bathrooms.toString()
            }
            exclusive
            onChange={handleBathsChange}
            aria-label="baths"
            size="small"
            fullWidth
          >
            <CustomToggleButton value="Any">Any</CustomToggleButton>
            <CustomToggleButton value="1">1+</CustomToggleButton>
            <CustomToggleButton value="2">2+</CustomToggleButton>
            <CustomToggleButton value="3">3+</CustomToggleButton>
            <CustomToggleButton value="4">4+</CustomToggleButton>
            <CustomToggleButton value="5+">5+</CustomToggleButton>
          </CustomToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Area
          </Typography>
          <Slider
            value={areaRange}
            onChange={handleAreaChange}
            onChangeCommitted={handleAreaChangeCommitted}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={100}
            valueLabelFormat={(value) => `${value}sqft`}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceChangeCommitted}
            valueLabelDisplay="auto"
            min={500000}
            max={5000000000}
            step={500000}
            valueLabelFormat={(value) => formatCurrency(value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Property Type
          </Typography>
          <Select
            fullWidth
            name="propertyType"
            value={filters.propertyType || ""}
            onChange={handleSelectChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Land">Land</MenuItem>
            <MenuItem value="Mansion">Mansion</MenuItem>
          </Select>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Property Location
          </Typography>
          <Select
            fullWidth
            name="location"
            value={filters.location || ""}
            onChange={handleSelectChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Select Location</MenuItem>
            {locations.map((location, index: number) => (
              <MenuItem key={index} value={location.region}>
                {location.region}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Property Category
          </Typography>
          <Select
            fullWidth
            name="propertyCategory"
            value={filters.propertyCategory || ""}
            onChange={handleSelectChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Industrial">Industrial</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button variant="outlined" onClick={handleReset} fullWidth sx={{ bgcolor: "white" }}>
            Reset filter
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default PropertyFilter
