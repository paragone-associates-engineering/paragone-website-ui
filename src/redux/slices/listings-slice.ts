import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { listingsApi } from "../../services/api"
import type { ApiProperty, ListingsQueryParams } from "../../types/properties"
import axios from "axios"

interface ListingsState {
  properties: ApiProperty[]
  featuredProperties: ApiProperty[]
  relatedProperties: ApiProperty[]
  totalCount: number
  currentPage: number
  pageSize: number
  loading: boolean
  featuredLoading: boolean
  relatedLoading: boolean
  error: string | null
  featuredError: string | null
  relatedError: string | null
  filters: ListingsQueryParams
  selectedProperty: ApiProperty | null
}

const initialState: ListingsState = {
  properties: [],
  featuredProperties: [],
  relatedProperties: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  featuredLoading: false,
  relatedLoading: false,
  error: null,
  featuredError: null,
  relatedError: null,
  filters: {},
  selectedProperty: null,
}

// Simple transform to match your API exactly
const transformFiltersToApiFormat = (filters: ListingsQueryParams) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiFilters: any = {}

  // Amount range
  if (filters.amountFrom || filters.amountTo) {
    apiFilters.amount = {
      from: filters.amountFrom || 0,
      to: filters.amountTo || 0,
    }
  }

  // Area range
  if (filters.areaFrom || filters.areaTo) {
    apiFilters.area = {
      from: filters.areaFrom || 0,
      to: filters.areaTo || 0,
    }
  }

  // Simple string fields
  if (filters.propertyCategory) apiFilters.propertyCategory = filters.propertyCategory
  if (filters.propertyType) apiFilters.propertyType = filters.propertyType
  if (filters.propertyName) apiFilters.propertyName = filters.propertyName
  if (filters.listingType) apiFilters.listingType = filters.listingType
  if (filters.featured !== undefined) apiFilters.featured = filters.featured

  // Location as simple string
  if (filters.location) {
    apiFilters.location = typeof filters.location === "string" ? filters.location : filters.location.city
  }

  // Property details array - bedrooms and bathrooms as numbers
  const propertyDetails = []
  if (filters.bedrooms) {
    propertyDetails.push({ name: "bedrooms", value: filters.bedrooms })
  }
  if (filters.bathrooms) {
    propertyDetails.push({ name: "bathrooms", value: filters.bathrooms })
  }
  if (propertyDetails.length > 0) {
    apiFilters.propertyDetails = propertyDetails
  }

  return apiFilters
}

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (params: ListingsQueryParams = {}, { rejectWithValue }) => {
    try {
      const apiFilters = transformFiltersToApiFormat(params)
      console.log("params", params)
      console.log("apiFilters", apiFilters)  // Debug log

      const response = await axios.post("https://paragone-website-backend.onrender.com/listings/filter", apiFilters, {
        params: {
          page: params.page || 1,
          pageSize: params.pageSize || 10,
        },
      })

      const data = response.data
      return {
        properties: data.results || [],
        totalCount: data.metadata?.[0]?.total || 0,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      }
    } catch (error) {
      console.error("Error fetching listings:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch listings")
    }
  },
)

export const fetchFeaturedProperties = createAsyncThunk(
  "listings/fetchFeaturedProperties",
  async (_, { rejectWithValue }) => {
    try {
      const apiFilters = { featured: true }

      const response = await axios.post("https://paragone-website-backend.onrender.com/listings/filter", apiFilters, {
        params: {
          page: 1,
          pageSize: 3,
        },
      })

      const data = response.data
      return data.results || []
    } catch (error) {
      console.error("Error fetching featured properties:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch featured properties")
    }
  },
)

export const fetchRelatedProperties = createAsyncThunk(
  "listings/fetchRelatedProperties",
  async (
    { propertyType, locationRegion, excludeId }: { propertyType?: string; locationRegion?: string; excludeId?: string },
    { rejectWithValue },
  ) => {
    try {
      let apiFilters = {}

     
      if (propertyType) {
        apiFilters = { propertyType }
      } else if (locationRegion) {
        apiFilters = { "location.region": locationRegion }
      } else {
        
        return []
      }

      const response = await axios.post("https://paragone-website-backend.onrender.com/listings/filter", apiFilters, {
        params: {
          page: 1,
          pageSize: 6, 
        },
      })

      const data = response.data
      let properties = data.results || []

      
      if (excludeId) {
        properties = properties.filter((property: ApiProperty) => property._id !== excludeId)
      }

      return properties.slice(0, 3)
    } catch (error) {
      console.error("Error fetching related properties:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch related properties")
    }
  },
)

export const fetchListingById = createAsyncThunk(
  "listings/fetchListingById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await listingsApi.getListingById(id)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch listing")
    }
  },
)

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ListingsQueryParams>) => {
      state.filters = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null
    },
    clearFeaturedProperties: (state) => {
      state.featuredProperties = []
    },
    clearRelatedProperties: (state) => {
      state.relatedProperties = []
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchListings.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      state.loading = false
      state.properties = action.payload.properties || []
      state.totalCount = action.payload.totalCount || 0
      state.currentPage = action.payload.page || state.currentPage
      state.pageSize = action.payload.pageSize || state.pageSize
    })
    builder.addCase(fetchListings.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Featured properties
    builder.addCase(fetchFeaturedProperties.pending, (state) => {
      state.featuredLoading = true
      state.featuredError = null
    })
    builder.addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
      state.featuredLoading = false
      state.featuredProperties = action.payload
    })
    builder.addCase(fetchFeaturedProperties.rejected, (state, action) => {
      state.featuredLoading = false
      state.featuredError = action.payload as string
    })

    // Related properties
    builder.addCase(fetchRelatedProperties.pending, (state) => {
      state.relatedLoading = true
      state.relatedError = null
    })
    builder.addCase(fetchRelatedProperties.fulfilled, (state, action) => {
      state.relatedLoading = false
      state.relatedProperties = action.payload
    })
    builder.addCase(fetchRelatedProperties.rejected, (state, action) => {
      state.relatedLoading = false
      state.relatedError = action.payload as string
    })

    // Single listing
    builder.addCase(fetchListingById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchListingById.fulfilled, (state, action) => {
      state.loading = false
      state.selectedProperty = action.payload
    })
    builder.addCase(fetchListingById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const {
  setFilters,
  setCurrentPage,
  setPageSize,
  clearSelectedProperty,
  clearFeaturedProperties,
  clearRelatedProperties,
} = listingsSlice.actions
export default listingsSlice.reducer