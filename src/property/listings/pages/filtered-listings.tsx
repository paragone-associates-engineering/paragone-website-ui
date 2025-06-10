
import { useState, useEffect, useCallback } from "react"
import { Container, Box, Typography, Grid, Drawer, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { PageBanner } from "../../../common/banner/page-banner"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import PropertyGrid from "../components/property-layout"
import Testimonials from "../../../common/testimonial"
import PropertyFilter from "../components/property-filter"
import type { ListingsQueryParams } from "../../../types/properties"
import CustomButton from "../../../common/button"
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks"
import { fetchListings, setFilters, setCurrentPage } from "../../../redux/slices/listings-slice"

const FilteredListings = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const isMobile = useMediaQuery("(max-width: 900px)")
  const listings = useAppSelector((state) => state.listings)

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open)
  }

  const { properties, totalCount, loading, filters, currentPage, pageSize } = listings || {
    properties: [],
    totalCount: 0,
    loading: true,
    currentPage: 1,
    pageSize: 6,
    filters: {},
  }

  // Parse URL params only once on mount
  useEffect(() => {
    if (isInitialized) return

    const searchParams = new URLSearchParams(location.search)
    const urlFilters: ListingsQueryParams = {}

    if (searchParams.has("listingType")) {
      urlFilters.listingType = searchParams.get("listingType") as string
    }
    if (searchParams.has("location")) {
      urlFilters.location = searchParams.get("location") as string
      console.log(searchParams.get("location"))
    }
    if (searchParams.has("propertyName")) {
      urlFilters.propertyName = searchParams.get("propertyName") as string
    }
    if (searchParams.has("propertyCategory")) {
      urlFilters.propertyCategory = searchParams.get("propertyCategory") as string
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
  }, [location.search, dispatch, isInitialized])

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: ListingsQueryParams, page: number) => {
      const searchParams = new URLSearchParams()

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, value.toString())
        }
      })

      if (page > 1) {
        searchParams.set("page", page.toString())
      }

      const newSearch = searchParams.toString()
      navigate(
        {
          pathname: location.pathname,
          search: newSearch ? `?${newSearch}` : "",
        },
        { replace: true },
      )
    },
    [navigate, location.pathname],
  )

  // Fetch listings when filters or page change
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
  }, [dispatch, filters, currentPage, pageSize, isInitialized, updateURL])

  const handleFilterChange = (newFilters: ListingsQueryParams) => {
    dispatch(setFilters(newFilters))
  }

  return (
    <Box sx={{ width: "100vw", px: { xs: 0, md: 0 } }}>
      <PageBanner title="Properties" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Properties" }]} />
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Showing {properties.length} results out of {totalCount}
          </Typography>

          {isMobile && (
            <CustomButton
              sx={{ bgcolor: "#333", color: "white" }}
              startIcon={FilterAltIcon}
              onClick={() => toggleDrawer(true)}
            >
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
              <PropertyFilter
                onFilterChange={handleFilterChange}
                initialFilters={filters}
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
