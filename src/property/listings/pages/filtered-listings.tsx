import { useState, useEffect } from "react"
import { Container, Box, Typography, Grid, Drawer, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { PageBanner } from "../../../common/banner/page-banner"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropertyGrid from "../components/property-layout"
import Testimonials from "../../../common/testimonial"
import PropertyFilter from "../components/property-filter"
import type { ListingsQueryParams } from "../../../types/properties"

import CustomButton from "../../../common/button";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
import { fetchListings, setFilters, setCurrentPage } from "../../../redux/slices/listings-slice"

const FilteredListings = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const listings = useAppSelector((state) => state.listings)

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };
  
  const { properties, totalCount, loading, filters, currentPage, pageSize } = listings || {
    properties: [],
    totalCount: 0,
    loading: true,
    currentPage: 1,
    pageSize: 6,
    filters: {},
  }

  // Parse query parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const urlFilters: ListingsQueryParams = {}

    // Handle listing type
    if (searchParams.has("listingType")) {
      urlFilters.listingType = searchParams.get("listingType") as string
    }

    // Handle location
    if (searchParams.has("location")) {
      urlFilters.location = searchParams.get("location") as string
    }

    // Handle property name
    if (searchParams.has("propertyName")) {
      urlFilters.propertyName = searchParams.get("propertyName") as string
    }

    // Handle property category
    if (searchParams.has("propertyCategory")) {
      urlFilters.propertyCategory = searchParams.get("propertyCategory") as string
    }

    // Handle property type
    if (searchParams.has("propertyType")) {
      urlFilters.propertyType = searchParams.get("propertyType") as string
    }

    // Handle amount range
    if (searchParams.has("amountFrom")) {
      urlFilters.amountFrom = Number.parseInt(searchParams.get("amountFrom") || "0", 10)
    }
    if (searchParams.has("amountTo")) {
      urlFilters.amountTo = Number.parseInt(searchParams.get("amountTo") || "0", 10)
    }

    // Handle area range
    if (searchParams.has("areaFrom")) {
      urlFilters.areaFrom = Number.parseInt(searchParams.get("areaFrom") || "0", 10)
    }
    if (searchParams.has("areaTo")) {
      urlFilters.areaTo = Number.parseInt(searchParams.get("areaTo") || "0", 10)
    }

    // Handle property details
    if (searchParams.has("bedrooms")) {
      urlFilters.bedrooms = searchParams.get("bedrooms") as string
    }
    if (searchParams.has("bathrooms")) {
      urlFilters.bathrooms = searchParams.get("bathrooms") as string
    }

    // Handle search string (if still needed)
    if (searchParams.has("searchString")) {
      urlFilters.searchString = searchParams.get("searchString") as string
    }

    // Handle pagination
    if (searchParams.has("page")) {
      const page = Number.parseInt(searchParams.get("page") || "1", 10)
      dispatch(setCurrentPage(page))
    }

    dispatch(setFilters(urlFilters))
  }, [location.search, dispatch])

  // Update URL when filters change
  useEffect(() => {
    if (!filters) return

    const searchParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value.toString())
      }
    })

    if (currentPage > 1) {
      searchParams.set("page", currentPage.toString())
    }

    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true },
    )
  }, [filters, currentPage, navigate, location.pathname])

  // Fetch listings when filters or pagination changes
  useEffect(() => {
    dispatch(fetchListings({ 
      ...filters, 
      page: currentPage, 
      pageSize 
    }))
  }, [dispatch, filters, currentPage, pageSize])

  const handleFilterChange = (newFilters: ListingsQueryParams) => {
    dispatch(setFilters(newFilters))
  }
  
  return (
    <Box sx={{width:'100vw', px:{xs:2, md:0}}}>
      <PageBanner
        title="Properties"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties" },
        ]}
      />
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Showing {properties.length} results out of {totalCount}
          </Typography>
      
          {isMobile && (
            <CustomButton sx={{bgcolor:'#333',color:'white'}} startIcon={FilterAltIcon} onClick={() => toggleDrawer(true)}>
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
              properties={properties}
              totalCount={totalCount}
              currentPage={currentPage}
              itemsPerPage={pageSize}
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