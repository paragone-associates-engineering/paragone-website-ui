"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Slider,
  Grid,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material"
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Landscape as LandscapeIcon,
  Business as BusinessIcon,
  FilterAlt as FilterAltIcon,
} from "@mui/icons-material"
import type { PropertyFilter } from "../types"
import { CustomToggleButtonGroup, CustomToggleButton } from "../../../common/toggle-button"
import { ListingsQueryParams } from "../../../types/properties"
import { setFilters } from "../../../redux/slices/listings-slice"
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
//import { useNavigate } from "react-router-dom"
interface PropertyFilterProps {
  onFilterChange?: (filters: ListingsQueryParams) => void
  initialFilters?: ListingsQueryParams
  compact?: boolean
  showListingTypeFilter?: boolean
}

const PropertyFilter = ({
  onFilterChange,
  initialFilters,
  compact = false,
  showListingTypeFilter = true,
}:PropertyFilterProps) => {
  const dispatch = useAppDispatch()
  const storeFilters = useAppSelector((state) => state.listings.filters)
 //const navigate = useNavigate();
  const [filters, setLocalFilters] = useState<ListingsQueryParams>(initialFilters || storeFilters)
  const [priceRange, setPriceRange] = useState<number[]>([filters.amountFrom || 500000, filters.amountTo || 5000000000])
  const [areaRange, setAreaRange] = useState<number[]>([filters.areaFrom || 0, filters.areaTo || 100000])

  // Update local state when Redux store filters change
  useEffect(() => {
    if (!initialFilters) {
      setLocalFilters(storeFilters)
    }
  }, [storeFilters, initialFilters])

  const handleListingTypeChange = (_event: React.MouseEvent<HTMLElement>, newListingType: string | null) => {
    if (newListingType) {
      let listingTypeValue = ""

      if (newListingType === "For Sale") {
        listingTypeValue = "For Sale"
      } else if (newListingType === "For Rent") {
        listingTypeValue = "For Rent"
      } else if (newListingType === "short-stay") {
        listingTypeValue = "Short Stay"
      }

      const updatedFilters = { ...filters, listingType: listingTypeValue }
      setLocalFilters(updatedFilters)

      if (onFilterChange) {
        onFilterChange(updatedFilters)
      } else {
        dispatch(setFilters(updatedFilters))
      }
    }
  }

  const handleBedsChange = (_event: React.MouseEvent<HTMLElement>, beds: string | null) => {
    let minBedrooms: number | undefined
    let maxBedrooms: number | undefined

    if (beds === "Any") {
      minBedrooms = undefined
      maxBedrooms = undefined
    } else if (beds === "5+") {
      minBedrooms = 5
      maxBedrooms = undefined
    } else if (beds) {
      minBedrooms = Number.parseInt(beds, 10)
      maxBedrooms = minBedrooms
    }

    const updatedFilters = { ...filters, minBedrooms, maxBedrooms }
    setLocalFilters(updatedFilters)

    if (onFilterChange) {
      onFilterChange(updatedFilters)
    } else {
      dispatch(setFilters(updatedFilters))
    }
  }

  const handleBathsChange = (_event: React.MouseEvent<HTMLElement>, baths: string | null) => {
    let minBathrooms: number | undefined
    let maxBathrooms: number | undefined

    if (baths === "Any") {
      minBathrooms = undefined
      maxBathrooms = undefined
    } else if (baths === "5+") {
      minBathrooms = 5
      maxBathrooms = undefined
    } else if (baths) {
      minBathrooms = Number.parseInt(baths, 10)
      maxBathrooms = minBathrooms
    }

    const updatedFilters = { ...filters, minBathrooms, maxBathrooms }
    setLocalFilters(updatedFilters)

    if (onFilterChange) {
      onFilterChange(updatedFilters)
    } else {
      dispatch(setFilters(updatedFilters))
    }
  }

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
  }

  const handlePriceChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    const updatedFilters = { ...filters, amountFrom: min, amountTo: max }
    setLocalFilters(updatedFilters)

    if (onFilterChange) {
      onFilterChange(updatedFilters)
    } else {
      dispatch(setFilters(updatedFilters))
    }
  }

  const handleAreaChange = (_event: Event, newValue: number | number[]) => {
    setAreaRange(newValue as number[])
  }

  const handleAreaChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    const updatedFilters = { ...filters, minSquareFeet: min, maxSquareFeet: max }
    setLocalFilters(updatedFilters)

    if (onFilterChange) {
      onFilterChange(updatedFilters)
    } else {
      dispatch(setFilters(updatedFilters))
    }
  }

  const handleInputChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    const updatedFilters = { ...filters, [name]: value }
    setLocalFilters(updatedFilters)
  }

  
  const handleReset = () => {
    const resetFilters: ListingsQueryParams = {}
    setLocalFilters(resetFilters)
    setPriceRange([0, 10000000])
    setAreaRange([0, 10000])

    if (onFilterChange) {
      onFilterChange(resetFilters)
    } else {
      dispatch(setFilters(resetFilters))
    }
  }

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange(filters)
    } else {
      dispatch(setFilters(filters))
    }
  }

  // Format currency
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
              value={
                filters.listingType === "For Sale"
                  ? "sale"
                  : filters.listingType === "For Rent"
                    ? "rent"
                    : filters.listingType === "Short Stay"
                      ? "short-stay"
                      : ""
              }
              exclusive
              onChange={handleListingTypeChange}
              aria-label="listing type"
            >
              <CustomToggleButton value="sale" aria-label="for sale">
                <HomeIcon sx={{ mr: 1 }} />
                For sale
              </CustomToggleButton>
              <CustomToggleButton value="rent" aria-label="for rent">
                <ApartmentIcon sx={{ mr: 1 }} />
                For rent
              </CustomToggleButton>
              <CustomToggleButton value="short-stay" aria-label="short stay">
                <BusinessIcon sx={{ mr: 1 }} />
                Short stay
              </CustomToggleButton>
              <CustomToggleButton value="land" aria-label="land">
                <LandscapeIcon sx={{ mr: 1 }} />
                Land
              </CustomToggleButton>
            </CustomToggleButtonGroup>
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
    <Paper elevation={0} sx={{ p: 3, backgroundColor: "secondary.main", borderRadius: 2 }}>
      <Typography variant="h5" sx={{bgcolor:'white'}} gutterBottom>
        Advanced search
      </Typography>

      <Box sx={{ mt: 3 }}>
        {/* <Typography variant="subtitle1" gutterBottom>
          Search
        </Typography> */}

        {/* <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            name="searchString"
            label="Search properties"
            value={filters.searchString || ""}
            onChange={(e) => handleInputChange(e as SelectChangeEvent<string>)}
            placeholder="Enter keywords..."
            size="small"
          />
        </Box> */}

        <Typography variant="h6" gutterBottom>
          Filter by features
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Beds
          </Typography>
          <CustomToggleButtonGroup
            value={
              filters.bedrooms === undefined
                ? "Any"
                : filters.bedrooms === 5
                  ? "5+"
                  : filters.bedrooms?.toString()
            }
            exclusive
            onChange={handleBedsChange}
            aria-label="beds"
            size="small"
            fullWidth
          >
            <CustomToggleButton value="Any" aria-label="any beds">
              Any
            </CustomToggleButton>
            <CustomToggleButton value="1" aria-label="1 bed">
              1+
            </CustomToggleButton>
            <CustomToggleButton value="2" aria-label="2 beds">
              2+
            </CustomToggleButton>
            <CustomToggleButton value="3" aria-label="3 beds">
              3+
            </CustomToggleButton>
            <CustomToggleButton value="4" aria-label="4 beds">
              4+
            </CustomToggleButton>
            <CustomToggleButton value="5+" aria-label="5+ beds">
              5+
            </CustomToggleButton>
          </CustomToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Baths
          </Typography>
          <CustomToggleButtonGroup
            value={
              filters.bathrooms === undefined
                ? "Any"
                : filters.bathrooms === 5
                  ? "5+"
                  : filters.bathrooms?.toString()
            }
            exclusive
            onChange={handleBathsChange}
            aria-label="baths"
            size="small"
            fullWidth
          >
            <CustomToggleButton value="Any" aria-label="any baths">
              Any
            </CustomToggleButton>
            <CustomToggleButton value="1" aria-label="1 bath">
              1+
            </CustomToggleButton>
            <CustomToggleButton value="2" aria-label="2 baths">
              2+
            </CustomToggleButton>
            <CustomToggleButton value="3" aria-label="3 baths">
              3+
            </CustomToggleButton>
            <CustomToggleButton value="4" aria-label="4 baths">
              4+
            </CustomToggleButton>
            <CustomToggleButton value="5+" aria-label="5+ baths">
              5+
            </CustomToggleButton>
          </CustomToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Area
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
            { `<50sqm`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              10,000+sqm
            </Typography>
          </Box>
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
                valueLabelFormat={(value) => `${value}sqft`}
              />
            </Grid>
          </Grid>
          
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ₦500,000
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ₦5Billion+
            </Typography>
          </Box>
          <Grid container spacing={2} alignItems="center">
         
            <Grid item xs>
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
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between"}}>
            <Typography variant="caption" color="text.secondary">
            Minimum Price
            </Typography>
            <Typography variant="caption" color="text.secondary">
             Maximum Price
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
  <Typography variant="h6" gutterBottom>
    Property Type
  </Typography>
  <Select
    fullWidth
    name="type"
    value={filters.propertyType || ""}
    onChange={handleInputChange}
    displayEmpty
    size="small"
  >
    <MenuItem value="">Select Type</MenuItem>
    <MenuItem value="apartment">Apartment</MenuItem>
    <MenuItem value="house">House</MenuItem>
    <MenuItem value="land">Land</MenuItem>
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
    onChange={handleInputChange}
    displayEmpty
    size="small"
  >
    <MenuItem value="">Select Location</MenuItem>
    <MenuItem value="new_york">New York</MenuItem>
    <MenuItem value="los angeles">Los Angeles</MenuItem>
    <MenuItem value="dallas">Dallas</MenuItem>
  </Select>
</Box>

<Box sx={{ mb: 3 }}>
  <Typography variant="h6" gutterBottom>
    Property Category
  </Typography>
  <Select
    fullWidth
    name="category"
    value={filters.propertyCategory || ""}
    onChange={handleInputChange}
    displayEmpty
    size="small"
  >
    <MenuItem value="">Select Category</MenuItem>
    <MenuItem value="for sale">For Sale</MenuItem>
    <MenuItem value="for rent">For Rent</MenuItem>
    <MenuItem value="featured">Featured</MenuItem>
  </Select>
</Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4, whiteSpace:'nowrap' }}>
          <Button variant="outlined" onClick={handleReset} fullWidth sx={{bgcolor:'white'}}>
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

