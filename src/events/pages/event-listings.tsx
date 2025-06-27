"use client"

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
import { PageBanner } from "../../common/banner/page-banner"
import EventCard from "../components/event-card"
import EventCardSkeleton from "../components/event-card-skeleton"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"
import { fetchEvents, setCurrentPage, setFilters, clearError } from "../../redux/slices/events-slice"
import type { EventsQueryParams } from "../../types/events"

const EventsListing = () => {
  const dispatch = useAppDispatch()
  const { events, loading, error, totalCount, currentPage, pageSize, filters } = useAppSelector((state) => state.events)

  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchEvents({}))
  }, [dispatch])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof EventsQueryParams, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value === "" ? undefined : value,
    }
    dispatch(setFilters(newFilters))
  }

  const clearAllFilters = () => {
    const resetFilters: EventsQueryParams = {
      eventType: "",
      isPaid: undefined,
      status: "active",
    }
    dispatch(setFilters(resetFilters))
  }

  const getActiveFilters = () => {
    const activeFilters = []
    if (filters.eventType) activeFilters.push({ key: "eventType", label: "Event Type", value: filters.eventType })
    if (filters.isPaid !== undefined)
      activeFilters.push({ key: "isPaid", label: "Price", value: filters.isPaid ? "Paid" : "Free" })
    if (filters.status && filters.status !== "active")
      activeFilters.push({ key: "status", label: "Status", value: filters.status })
    return activeFilters
  }

  const activeFilters = getActiveFilters()
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <Box sx={{ width: "100vw" }}>
      <PageBanner
        title="Events"
        //subtitle="Discover amazing events and networking opportunities"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Header with Filter Toggle */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Upcoming Events
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Showing {events.length} of {totalCount} events
              </Typography>
            </Box>

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

          {/* Active Filters Display */}
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
                    onDelete={() => handleFilterChange(filter.key as keyof EventsQueryParams, "")}
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

          {/* Collapsible Filters */}
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
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontWeight: 500 }}>Event Type</InputLabel>
                    <Select
                      value={filters.eventType || ""}
                      label="Event Type"
                      onChange={(e) => handleFilterChange("eventType", e.target.value)}
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
                      <MenuItem value="">All Types</MenuItem>
                      <MenuItem value="inPerson">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "success.main",
                            }}
                          />
                          In Person
                        </Box>
                      </MenuItem>
                      <MenuItem value="virtual">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "info.main",
                            }}
                          />
                          Virtual
                        </Box>
                      </MenuItem>
                      <MenuItem value="hybrid">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "warning.main",
                            }}
                          />
                          Hybrid
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
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
                      <MenuItem value="">All Events</MenuItem>
                      <MenuItem value="false">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip label="FREE" size="small" color="success" variant="outlined" />
                          Free Events
                        </Box>
                      </MenuItem>
                      <MenuItem value="true">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip label="PAID" size="small" color="primary" variant="outlined" />
                          Paid Events
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              
                <Grid item xs={12} sm={6} md={3}>
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

        {/* Events Grid */}
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: pageSize }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <EventCardSkeleton />
                </Grid>
              ))
            : events.map((event) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                  <EventCard event={event} />
                </Grid>
              ))}
        </Grid>

        {!loading && events.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No events found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or check back later for new events.
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

export default EventsListing
