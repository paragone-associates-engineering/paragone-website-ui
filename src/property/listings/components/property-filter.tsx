"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material"
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Landscape as LandscapeIcon,
  Business as BusinessIcon,
  FilterAlt as FilterAltIcon,
} from "@mui/icons-material"
import type { PropertyFilter } from "../types"
import { formatCurrency } from "../utils"

interface PropertyFilterProps {
  onFilterChange: (filters: PropertyFilter) => void
  initialFilters?: PropertyFilter
  compact?: boolean
  showListingTypeFilter?: boolean
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({
  onFilterChange,
  initialFilters = {},
  compact = false,
  showListingTypeFilter = true,
}) => {
  const [filters, setFilters] = useState<PropertyFilter>(initialFilters)
  const [priceRange, setPriceRange] = useState<number[]>([filters.minPrice || 0, filters.maxPrice || 5000000])
  const [areaRange, setAreaRange] = useState<number[]>([filters.minArea || 0, filters.maxArea || 10000])

  const handleListingTypeChange = (_event: React.MouseEvent<HTMLElement>, newListingType: string | null) => {
    if (newListingType) {
      const updatedFilters = { ...filters, listingType: newListingType as any }
      setFilters(updatedFilters)
      onFilterChange(updatedFilters)
    }
  }

  const handleBedsChange = (_event: React.MouseEvent<HTMLElement>, beds: string | null) => {
    let minBeds: number | undefined
    let maxBeds: number | undefined

    if (beds === "Any") {
      minBeds = undefined
      maxBeds = undefined
    } else if (beds === "5+") {
      minBeds = 5
      maxBeds = undefined
    } else if (beds) {
      minBeds = Number.parseInt(beds, 10)
      maxBeds = minBeds
    }

    const updatedFilters = { ...filters, minBeds, maxBeds }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleBathsChange = (_event: React.MouseEvent<HTMLElement>, baths: string | null) => {
    let minBaths: number | undefined
    let maxBaths: number | undefined

    if (baths === "Any") {
      minBaths = undefined
      maxBaths = undefined
    } else if (baths === "5+") {
      minBaths = 5
      maxBaths = undefined
    } else if (baths) {
      minBaths = Number.parseInt(baths, 10)
      maxBaths = minBaths
    }

    const updatedFilters = { ...filters, minBaths, maxBaths }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
  }

  const handlePriceChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    const updatedFilters = { ...filters, minPrice: min, maxPrice: max }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleAreaChange = (_event: Event, newValue: number | number[]) => {
    setAreaRange(newValue as number[])
  }

  const handleAreaChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    const updatedFilters = { ...filters, minArea: min, maxArea: max }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      const updatedFilters = { ...filters, [name]: value }
      setFilters(updatedFilters)
      onFilterChange(updatedFilters)
    }
  }

  const handleReset = () => {
    const resetFilters: PropertyFilter = {}
    setFilters(resetFilters)
    setPriceRange([0, 5000000])
    setAreaRange([0, 10000])
    onFilterChange(resetFilters)
  }

  const handleSearch = () => {
    onFilterChange(filters)
  }

  if (compact) {
    return (
      <Box sx={{ mb: 4 }}>
        {showListingTypeFilter && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <ToggleButtonGroup
              value={filters.listingType || ""}
              exclusive
              onChange={handleListingTypeChange}
              aria-label="listing type"
            >
              <ToggleButton value="sale" aria-label="for sale">
                <HomeIcon sx={{ mr: 1 }} />
                For sale
              </ToggleButton>
              <ToggleButton value="rent" aria-label="for rent">
                <ApartmentIcon sx={{ mr: 1 }} />
                For rent
              </ToggleButton>
              <ToggleButton value="short-stay" aria-label="short stay">
                <BusinessIcon sx={{ mr: 1 }} />
                Short stay
              </ToggleButton>
              <ToggleButton value="land" aria-label="land">
                <LandscapeIcon sx={{ mr: 1 }} />
                Land
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
          sx={{ ml: "auto", display: "block" }}
          onClick={() => {}}
        >
          Filters
        </Button>
      </Box>
    )
  }

  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: "background.paper", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Advanced search
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Filter by features
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Beds
          </Typography>
          <ToggleButtonGroup
            value={filters.minBeds === undefined ? "Any" : filters.minBeds === 5 ? "5+" : filters.minBeds?.toString()}
            exclusive
            onChange={handleBedsChange}
            aria-label="beds"
            size="small"
            fullWidth
          >
            <ToggleButton value="Any" aria-label="any beds">
              Any
            </ToggleButton>
            <ToggleButton value="1" aria-label="1 bed">
              1+
            </ToggleButton>
            <ToggleButton value="2" aria-label="2 beds">
              2+
            </ToggleButton>
            <ToggleButton value="3" aria-label="3 beds">
              3+
            </ToggleButton>
            <ToggleButton value="4" aria-label="4 beds">
              4+
            </ToggleButton>
            <ToggleButton value="5+" aria-label="5+ beds">
              5+
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Baths
          </Typography>
          <ToggleButtonGroup
            value={
              filters.minBaths === undefined ? "Any" : filters.minBaths === 5 ? "5+" : filters.minBaths?.toString()
            }
            exclusive
            onChange={handleBathsChange}
            aria-label="baths"
            size="small"
            fullWidth
          >
            <ToggleButton value="Any" aria-label="any baths">
              Any
            </ToggleButton>
            <ToggleButton value="1" aria-label="1 bath">
              1+
            </ToggleButton>
            <ToggleButton value="2" aria-label="2 baths">
              2+
            </ToggleButton>
            <ToggleButton value="3" aria-label="3 baths">
              3+
            </ToggleButton>
            <ToggleButton value="4" aria-label="4 baths">
              4+
            </ToggleButton>
            <ToggleButton value="5+" aria-label="5+ baths">
              5+
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Area
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={areaRange}
                onChange={handleAreaChange}
                onChangeCommitted={handleAreaChangeCommitted}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
                valueLabelFormat={(value) => `${value}sqm`}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              0sqm
            </Typography>
            <Typography variant="caption" color="text.secondary">
              10,000+sqm
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Price
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                onChangeCommitted={handlePriceChangeCommitted}
                valueLabelDisplay="auto"
                min={0}
                max={5000000}
                step={100000}
                valueLabelFormat={(value) => formatCurrency(value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ₦500,000
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ₦5 Billion+
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Property Type
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              name="propertyType"
              value={filters.propertyType || ""}
              onChange={handleSelectChange as React.ChangeEventHandler<{ name?: string; value: unknown }>}
              displayEmpty
            >
              <MenuItem value="">Any type</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="land">Land</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Property Location
          </Typography>
          <FormControl fullWidth size="small">
            <Select name="location" value={filters.location || ""} onChange={handleSelectChange as any} displayEmpty>
              <MenuItem value="">Select location</MenuItem>
              <MenuItem value="lagos">Lagos</MenuItem>
              <MenuItem value="abuja">Abuja</MenuItem>
              <MenuItem value="port-harcourt">Port Harcourt</MenuItem>
              <MenuItem value="ibadan">Ibadan</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            Property Category
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              name="propertyCategory"
              value={filters.propertyCategory || ""}
              onChange={handleSelectChange as any}
              displayEmpty
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
              <MenuItem value="industrial">Industrial</MenuItem>
              <MenuItem value="luxury">Luxury</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4, whiteSpace:'nowrap' }}>
          <Button variant="outlined" onClick={handleReset} fullWidth>
            Reset filter
          </Button>
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default PropertyFilter

