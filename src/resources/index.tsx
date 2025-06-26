
import type React from "react"

import { useEffect, useState } from "react"
import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Paper,
  Collapse,
  Button,
  Stack,
} from "@mui/material"
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
 
} from "@mui/icons-material"

import ResourceCard from "./components/resource-card"
import ResourceCardSkeleton from "./components/resource-card-skeleton"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { fetchResources, setCurrentPage, clearError } from "../redux/slices/resources-slice"

import { PageBanner } from "../common/banner/page-banner"
import { ResourcesQueryParams } from "./types"

const ResourcesListing = () => {
  const dispatch = useAppDispatch()
  const { resources, loading, error, totalCount, currentPage, pageSize } = useAppSelector((state) => state.resources)

  const [filters, setFilters] = useState<ResourcesQueryParams>({
    isPaid: undefined,
    isActive: true,
    search: "",
  })

  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }))
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  useEffect(() => {
    dispatch(fetchResources({ ...filters, page: currentPage, pageSize }))
  }, [dispatch, filters, currentPage, pageSize])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof ResourcesQueryParams, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }))
    dispatch(setCurrentPage(1))
  }

  const clearAllFilters = () => {
    setFilters({
      isPaid: undefined,
      isActive: true,
      search: "",
    })
    setSearchTerm("")
    dispatch(setCurrentPage(1))
  }

  const getActiveFilters = () => {
    const activeFilters = []
    if (filters.isPaid !== undefined)
      activeFilters.push({ key: "isPaid", label: "Price", value: filters.isPaid ? "Premium" : "Free" })
    if (filters.isActive === false) activeFilters.push({ key: "isActive", label: "Status", value: "All" })
    if (filters.search) activeFilters.push({ key: "search", label: "Search", value: filters.search })
    return activeFilters
  }

  const activeFilters = getActiveFilters()
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title="Resource Library"
        //subtitle="Access valuable resources, guides, and tools to help you succeed"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Available Resources
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Showing {resources.length} of {totalCount} resources
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* <TextField
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{
                  minWidth: 250,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              /> */}

              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "primary.50",
                  },
                }}
              >
                Filters
                {activeFilters.length > 0 && (
                  <Chip
                    label={activeFilters.length}
                    size="small"
                    color="primary"
                    sx={{ ml: 1, minWidth: 24, height: 20 }}
                  />
                )}
              </Button>
            </Box>
          </Box>

          
          {activeFilters.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  Active filters:
                </Typography>
                {activeFilters.map((filter) => (
                  <Chip
                    key={filter.key}
                    label={`${filter.label}: ${filter.value}`}
                    onDelete={() => {
                      if (filter.key === "search") {
                        setSearchTerm("")
                      } else {
                        handleFilterChange(filter.key as keyof ResourcesQueryParams, "")
                      }
                    }}
                    deleteIcon={<ClearIcon />}
                    variant="filled"
                    color="primary"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      "& .MuiChip-deleteIcon": {
                        fontSize: 16,
                      },
                    }}
                  />
                ))}
                <Button
                  size="small"
                  onClick={clearAllFilters}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    minWidth: "auto",
                    p: 0.5,
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "primary.main",
                    },
                  }}
                >
                  Clear all
                </Button>
              </Stack>
            </Box>
          )}

         
          <Collapse in={showFilters}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "grey.50",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontWeight: 500 }}>Price</InputLabel>
                    <Select
                      value={filters.isPaid === undefined ? "" : filters.isPaid.toString()}
                      label="Price"
                      onChange={(e) =>
                        handleFilterChange("isPaid", e.target.value === "" ? undefined : e.target.value === "true")
                      }
                      sx={{
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "divider",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <MenuItem value="">All Resources</MenuItem>
                      <MenuItem value="false">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip label="FREE" size="small" color="success" variant="outlined" />
                          Free Resources
                        </Box>
                      </MenuItem>
                      <MenuItem value="true">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip label="PREMIUM" size="small" color="primary" variant="outlined" />
                          Premium Resources
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

               

                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={clearAllFilters}
                      disabled={activeFilters.length === 0}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderColor: "divider",
                        color: "text.secondary",
                        "&:hover": {
                          borderColor: "error.main",
                          color: "error.main",
                          bgcolor: "error.50",
                        },
                        "&:disabled": {
                          borderColor: "divider",
                          color: "text.disabled",
                        },
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Box>

       
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: pageSize }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ResourceCardSkeleton />
                </Grid>
              ))
            : resources.map((resource) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={resource.id}>
                  <ResourceCard resource={resource} />
                </Grid>
              ))}
        </Grid>

        {!loading && resources.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No resources found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
            {activeFilters.length > 0 && (
              <Button variant="outlined" onClick={clearAllFilters} sx={{ borderRadius: 2 }}>
                Clear All Filters
              </Button>
            )}
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 2,
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default ResourcesListing
