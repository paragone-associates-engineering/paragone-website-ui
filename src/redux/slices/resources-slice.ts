import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL } from "../../services/api"
import { CreateResourceApplication, Resource, ResourcesQueryParams, ResourcesResponse } from "../../resources/types"

interface ResourcesState {
  resources: Resource[]
  allResources: Resource[]
  selectedResource: Resource | null
  totalCount: number
  currentPage: number
  pageSize: number
  loading: boolean
  error: string | null
  applicationLoading: boolean
  applicationSuccess: boolean
  filters: ResourcesQueryParams
}

const initialState: ResourcesState = {
  resources: [],
  allResources: [],
  selectedResource: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 12,
  loading: false,
  error: null,
  applicationLoading: false,
  applicationSuccess: false,
   filters: {},
}

const applyFilters = (resources: Resource[], filters: ResourcesQueryParams) => {
  let filtered = [...resources]

  // Filter by paid/free
  if (filters.isPaid !== undefined) {
    filtered = filtered.filter((resource) => resource.isPaid === filters.isPaid)
  }

  // Filter by active status
  if (filters.isActive !== undefined) {
    filtered = filtered.filter((resource) => resource.isActive === filters.isActive)
  }

  // Filter by search term
  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim()
    filtered = filtered.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchTerm) || resource.summary.toLowerCase().includes(searchTerm),
    )
  }

  return filtered
}

export const fetchResources = createAsyncThunk(
  "resources/fetchResources",
  async (params: ResourcesQueryParams = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get<ResourcesResponse>(
        `${API_BASE_URL}/resource/get-resources`,
        {
          params: {
            page: 1,
            pageSize: 1000, 
          },
        },
      )

      return {
       resources: response.data.results,
        totalCount: response.data.metadata[0]?.total || 0,
        filters: params,
      }
    } catch (error) {
      console.error("Error fetching resources:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch resources")
    }
  },
)

export const fetchResourceById = createAsyncThunk(
  "resources/fetchResourceById",
  async (resourceId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Resource>(
        `${API_BASE_URL}/resource/get-resource/${resourceId}`,
      )
      return response.data
    } catch (error) {
      console.error("Error fetching resource:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch resource")
    }
  },
)

export const applyToResource = createAsyncThunk(
  "resources/applyToResource",
  async (
    payload: { application: CreateResourceApplication; resourceId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/resource/apply/${payload.resourceId}`,
        payload.application,
      )
      return response.data
    } catch (error) {
      console.error("Error applying to resource:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to apply to resource")
    }
  },
)

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
      // Apply pagination to filtered resources
      const filteredResources = applyFilters(state.allResources, state.filters)
      const startIndex = (action.payload - 1) * state.pageSize
      const endIndex = startIndex + state.pageSize
      state.resources = filteredResources.slice(startIndex, endIndex)
      state.totalCount = filteredResources.length
    },
    setFilters: (state, action: PayloadAction<ResourcesQueryParams>) => {
      state.filters = action.payload
      state.currentPage = 1
      // Apply filters and pagination
      const filteredResources = applyFilters(state.allResources, action.payload)
      state.resources = filteredResources.slice(0, state.pageSize)
      state.totalCount = filteredResources.length
    },
    clearSelectedResource: (state) => {
      state.selectedResource = null
    },
    clearApplicationSuccess: (state) => {
      state.applicationSuccess = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Resources
      .addCase(fetchResources.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false
        state.allResources = action.payload.resources
        state.filters = action.payload.filters
        // Apply initial filters
        const filteredResources = applyFilters(action.payload.resources, action.payload.filters)
        state.resources = filteredResources.slice(0, state.pageSize)
        state.totalCount = filteredResources.length
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch Resource by ID
      .addCase(fetchResourceById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchResourceById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedResource = action.payload
      })
      .addCase(fetchResourceById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      
      .addCase(applyToResource.pending, (state) => {
        state.applicationLoading = true
        state.error = null
        state.applicationSuccess = false
      })
      .addCase(applyToResource.fulfilled, (state) => {
        state.applicationLoading = false
        state.applicationSuccess = true
      })
      .addCase(applyToResource.rejected, (state, action) => {
        state.applicationLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, setFilters, clearSelectedResource, clearApplicationSuccess, clearError } =
  resourcesSlice.actions
export default resourcesSlice.reducer
