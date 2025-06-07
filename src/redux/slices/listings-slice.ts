import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { listingsApi } from "../../services/api"
import type { ApiProperty, ListingsQueryParams } from "../../types/properties"
import axios from "axios"

interface ListingsState {
  properties: ApiProperty[]
  totalCount: number
  currentPage: number
  pageSize: number
  loading: boolean
  error: string | null
  filters: ListingsQueryParams
  selectedProperty: ApiProperty | null
}

const initialState: ListingsState = {
  properties: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
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

  // Location as simple string
  if (filters.location) {
    apiFilters.location = typeof filters.location === "string" ? filters.location : filters.location.region
  }

  // Property details array
  const propertyDetails = []
  if (filters.bedrooms) {
    propertyDetails.push({ name: "bedrooms", value: filters.bedrooms.toString() })
  }
  if (filters.bathrooms) {
    propertyDetails.push({ name: "bathrooms", value: filters.bathrooms.toString() })
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
console.log('params',params)
      const response = await axios.post("https://paragone-website-backend.onrender.com/listings/filter", apiFilters, {
        params: {
          page: params.page || 1,
          pageSize: params.pageSize || 10,
        },
      })
//console.log(response.data)
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

export const { setFilters, setCurrentPage, setPageSize, clearSelectedProperty } = listingsSlice.actions
export default listingsSlice.reducer
