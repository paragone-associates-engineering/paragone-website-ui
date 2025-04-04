import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { listingsApi } from "../../services/api"
import type { ApiProperty, ListingsQueryParams } from "../types"

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

// Async thunks
export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (params: ListingsQueryParams = {}, { rejectWithValue }) => {
    try {
      return await listingsApi.getListings(params)
    } catch (error) {
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

export const fetchListingsByRegion = createAsyncThunk(
  "listings/fetchListingsByRegion",
  async (
    data: { regionId: string; filters: ListingsQueryParams; page: number; pageSize: number },
    { rejectWithValue },
  ) => {
    try {
      const { regionId, filters, page, pageSize } = data
      const params: ListingsQueryParams = { ...filters, location: regionId, page, pageSize }
      return await listingsApi.getListings(params)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch listings by region")
    }
  },
)

// Create the slice
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
      state.currentPage = 1 // Reset to first page when page size changes
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null
    },
  },
  extraReducers: (builder) => {
    // Handle fetchListings
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

    // Handle fetchListingById
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

    // Handle fetchListingsByRegion
    builder.addCase(fetchListingsByRegion.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchListingsByRegion.fulfilled, (state, action) => {
      state.loading = false
      state.properties = action.payload.properties || []
      state.totalCount = action.payload.totalCount || 0
      state.currentPage = action.payload.page || state.currentPage
      state.pageSize = action.payload.pageSize || state.pageSize
    })
    builder.addCase(fetchListingsByRegion.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

// Export actions and reducer
export const { setFilters, setCurrentPage, setPageSize, clearSelectedProperty } = listingsSlice.actions
export default listingsSlice.reducer

