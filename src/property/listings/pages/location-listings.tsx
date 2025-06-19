import { useState, useEffect, useCallback } from "react"
import { Container, Box, Typography, Stack, Button, Drawer, Grid, useMediaQuery } from "@mui/material"
import {  useLocation, useNavigate } from "react-router-dom"
import { PageBanner } from "../../../common/banner/page-banner"
import PropertyGrid from "../components/property-layout"
import Testimonials from "../../../common/testimonial"
import PropertyFilter from "../components/property-filter"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import HouseIcon from "@mui/icons-material/House"
import HomeWorkIcon from "@mui/icons-material/HomeWork"
import TerrainIcon from "@mui/icons-material/Terrain"
import ApartmentIcon from "@mui/icons-material/Apartment"
import type { ListingsQueryParams } from "../../../types/properties"
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
import { fetchListings, setFilters, setCurrentPage } from "../../../redux/slices/listings-slice"
import CustomButton from "../../../common/button"

const LocationListings = () => {
   const location = useLocation()
  // console.log('lpc',location.search)
  const searchParams = new URLSearchParams(location.search)
const decodedLocationId = searchParams.get('location') || ''
  const navigate = useNavigate()
 
  const isMobile = useMediaQuery("(max-width: 900px)")
  const dispatch = useAppDispatch()
  const listings = useAppSelector((state) => state.listings)

  const { properties, totalCount, loading, filters, currentPage, pageSize } = listings || {
    properties: [],
    totalCount: 0,
    loading: true,
    currentPage: 1,
    pageSize: 10,
    filters: {},
  }

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open)
  }

 
  useEffect(() => {
    if (isInitialized) return

    const searchParams = new URLSearchParams(location.search)
    const urlFilters: ListingsQueryParams = {}

    if (searchParams.has("listingType")) {
      const listingType = searchParams.get("listingType") as string
      urlFilters.listingType = listingType
      setActiveFilter(getFilterKeyFromListingType(listingType))
    }

    if (searchParams.has("propertyCategory")) {
      const propertyCategory = searchParams.get("propertyCategory") as string
      urlFilters.propertyCategory = propertyCategory
      setActiveFilter(getFilterKeyFromPropertyCategory(propertyCategory))
    }

    if (searchParams.has("location")) {
      urlFilters.location = searchParams.get("location") as string
    }
    if (searchParams.has("propertyName")) {
      urlFilters.propertyName = searchParams.get("propertyName") as string
    }
    if (searchParams.has("propertyType")) {
      urlFilters.propertyType = searchParams.get("propertyType") as string
    }
    if (searchParams.has("amountFrom")) {
      urlFilters.amountFrom = Number.parseInt(searchParams.get("amountFrom") || "0", 10)
    }
    if (searchParams.has("amountTo")) {
      urlFilters.amountTo = Number.parseInt(searchParams.get("amountTo") || "0", 10)
    }
    if (searchParams.has("areaFrom")) {
      urlFilters.areaFrom = Number.parseInt(searchParams.get("areaFrom") || "0", 10)
    }
    if (searchParams.has("areaTo")) {
      urlFilters.areaTo = Number.parseInt(searchParams.get("areaTo") || "0", 10)
    }
    if (searchParams.has("bedrooms")) {
      urlFilters.bedrooms = Number.parseInt(searchParams.get("bedrooms") || "0", 10)
    }
    if (searchParams.has("bathrooms")) {
      urlFilters.bathrooms = Number.parseInt(searchParams.get("bathrooms") || "0", 10)
    }
    if (searchParams.has("page")) {
      const page = Number.parseInt(searchParams.get("page") || "1", 10)
      dispatch(setCurrentPage(page))
    }

    dispatch(setFilters(urlFilters))
    setIsInitialized(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, dispatch, isInitialized])

 
 const updateURL = useCallback(
  (newFilters: ListingsQueryParams, page: number) => {
    const searchParams = new URLSearchParams()

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== 0) {
        searchParams.set(key, value.toString())
      }
    })


    if (decodedLocationId && !searchParams.has('location')) {
      searchParams.set('location', decodedLocationId.replace('?location=', ''))
    }

   
    if (page > 1) {
      searchParams.set("page", page.toString())
    }

    const newSearch = searchParams.toString()
    const newUrl = {
      pathname: location.pathname,
      search: newSearch ? `?${newSearch}` : "",
    }

   
    const currentSearch = location.search.replace("?", "")
    if (currentSearch !== newSearch) {
      navigate(newUrl, { replace: true })
    }
  },
  [navigate, location.pathname, location.search, decodedLocationId],
)
  
   useEffect(() => {
     if (!isInitialized) return
 
     dispatch(
       fetchListings({
         ...filters,
         page: currentPage,
         pageSize,
       }),
     )
 
     updateURL(filters, currentPage)
   }, [dispatch, filters, currentPage, pageSize, decodedLocationId, isInitialized, updateURL])
 

 const handleFilterChange = (newFilters: ListingsQueryParams) => {
    dispatch(setFilters(newFilters))
  
  }

  const filterOptions = [
    { value: "all", label: "All properties", icon: <HouseIcon />, listingType: undefined, propertyCategory: undefined },
    { value: "sale", label: "For Sale", icon: <HomeWorkIcon />, listingType: "For Sale", propertyCategory: undefined },
    { value: "rent", label: "For Rent", icon: <ApartmentIcon />, listingType: "For Rent", propertyCategory: undefined },
    { value: "shortStay", label: "Short Stay", icon: <HomeWorkIcon />, listingType: "Short Stay", propertyCategory: undefined },
    { value: "land", label: "Land", icon: <TerrainIcon />, listingType: undefined, propertyCategory: "Land" },
  ]

  const getFilterKeyFromListingType = (listingType: string): string => {
    const option = filterOptions.find((opt) => opt.listingType === listingType)
    return option?.value || "all"
  }

  const getFilterKeyFromPropertyCategory = (propertyCategory: string): string => {
    const option = filterOptions.find((opt) => opt.propertyCategory === propertyCategory)
    return option?.value || "all"
  }

  const handleFilterOptions = (value: string) => {
    setActiveFilter(value)
    const selectedOption = filterOptions.find((opt) => opt.value === value)

    const newFilters = { ...filters, location: decodedLocationId }
    
    if (selectedOption?.listingType) {
      newFilters.listingType = selectedOption.listingType
      // Clear property category when selecting listing type
      delete newFilters.propertyCategory
    } else if (selectedOption?.propertyCategory) {
      newFilters.propertyCategory = selectedOption.propertyCategory
      // Clear listing type when selecting property category
      delete newFilters.listingType
    } else {
      // Clear both when selecting "all"
      delete newFilters.listingType
      delete newFilters.propertyCategory
    }

    dispatch(setFilters(newFilters))
  }

  
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalCount)

  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title={`${decodedLocationId ? `Properties in ${decodedLocationId}`:'Available Propeties in All Regions'}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Listings", href: "/listings" },
          { label: `${decodedLocationId ? `Properties in ${decodedLocationId}`:'all Regions'}` },
        ]}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {totalCount > 0 ? (
              <>
                Showing {startItem}-{endItem} of {totalCount} properties in {decodedLocationId}
                {totalCount > pageSize && (
                  <span>
                    {" "}
                    (Page {currentPage} of {Math.ceil(totalCount / pageSize)})
                  </span>
                )}
              </>
            ) : (
              `No properties found in ${decodedLocationId}`
            )}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-end", sm: "center" },
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              overflowX: "auto",
              justifyContent: { xs: "flex-start" },
              gap: { xs: 0.8, md: 1 },
            }}
          >
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeFilter === option.value ? "contained" : "outlined"}
                onClick={() => handleFilterOptions(option.value)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: { md: 2 },
                  minWidth: { xs: "130px", sm: "auto" },
                  bgcolor: activeFilter === option.value ? "#ffa726" : "white",
                  color: activeFilter === option.value ? "white" : "inherit",
                  borderColor: "#e0e0e0",
                  "&:hover": {
                    bgcolor: activeFilter === option.value ? "#fb8c00" : "#f5f5f5",
                    borderColor: "#e0e0e0",
                  },
                  boxShadow: activeFilter === option.value ? 2 : 0,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      bgcolor: activeFilter === option.value ? "white" : "#EFF3F5",
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      color: activeFilter === option.value ? "primary.main" : "#757575",
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: activeFilter === option.value ? "bold" : "normal",
                    }}
                  >
                    {option.label}
                  </Typography>
                </Stack>
              </Button>
            ))}
          </Box>
          <CustomButton
            sx={{
              bgcolor: "#5A6164",
              color: "#fff",
              height: 40,
              borderRadius: 10,
              px: 2,
              mt: { xs: 2, md: 0 },
            }}
            startIcon={FilterAltIcon}
            onClick={() => toggleDrawer(true)}
          >
            Filter
          </CustomButton>
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
              <PropertyFilter
                onFilterChange={handleFilterChange}
                initialFilters={{ ...filters, location: decodedLocationId }}
                showListingTypeFilter={true}
                
              />
            </Grid>
          )}
          <Grid item xs={12} md={9}>
            <PropertyGrid
              properties={properties}
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
  )
}

export default LocationListings