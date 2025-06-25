/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_BASE_URL } from "../../services/api"
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export interface Job {
  _id: string
  id: string
  title: string
  department: string
  location: string
  duties: string
  skills: string
  experience: string
  description: string
  education: string
  applicationEndDate: string
}

interface JobState {
  jobs: Job[]
  allJobs: Job[] 
  jobDetails: Job | null
  totalPages: number
  loading: boolean
  autocompleteLoading: boolean
  error: string | null
}

// Initial state
const initialState: JobState = {
  jobs: [],
  allJobs: [],
  jobDetails: null,
  totalPages: 1,
  loading: false,
  autocompleteLoading: false,
  error: null,
}

// Fetch jobs with pagination (for career page)
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params: { page?: number } = {}, { rejectWithValue }) => {
    try {
      const page = params.page ?? 1
      const response = await axios.get(`${API_BASE_URL}/jobs/get-jobs?page=${page}`)
      return response.data
    } catch (error: unknown) {
      return rejectWithValue("Failed to fetch jobs")
    }
  }
)

// Search jobs for autocomplete (with optional searchString)
export const searchJobs = createAsyncThunk(
  "jobs/searchJobs",
  async (params: { searchString?: string; page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const { searchString, page = 1, limit = 50 } = params

      let url = `${API_BASE_URL}/jobs/get-jobs?page=${page}&limit=${limit}`

      if (searchString && searchString.trim()) {
        url += `&searchString=${encodeURIComponent(searchString.trim())}`
      }

      const response = await axios.get(url)
      return response.data
    } catch (error: unknown) {
      return rejectWithValue("Failed to search jobs")
    }
  },
)

// Fetch all job titles for autocomplete (without search)
export const fetchAllJobTitles = createAsyncThunk("jobs/fetchAllJobTitles", async (_, { rejectWithValue }) => {
  try {
    // Fetch with a high limit to get all jobs for autocomplete
    const response = await axios.get(`${API_BASE_URL}/jobs/get-jobs?page=1&limit=1000`)
    return response.data
  } catch (error: unknown) {
    return rejectWithValue("Failed to fetch job titles")
  }
})

// Fetch single job details
export const fetchJobDetails = createAsyncThunk("jobs/fetchJobDetails", async (jobId: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/get-job/${jobId}`)
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to fetch job details")
  }
})

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearJobSearch: (state) => {
      state.allJobs = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs (paginated) - for career page
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<{ results: Job[]; metadata: { totalPages: number }[] }>) => {
          state.loading = false
          state.jobs = action.payload.results
          state.totalPages = action.payload.metadata[0]?.totalPages || 1
        },
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Search jobs for autocomplete
      .addCase(searchJobs.pending, (state) => {
        state.autocompleteLoading = true
      })
      .addCase(searchJobs.fulfilled, (state, action: PayloadAction<{ results: Job[] }>) => {
        state.autocompleteLoading = false
        state.allJobs = action.payload.results || []
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.autocompleteLoading = false
        state.error = action.payload as string
      })

      // Fetch all job titles
      .addCase(fetchAllJobTitles.pending, (state) => {
        state.autocompleteLoading = true
      })
      .addCase(fetchAllJobTitles.fulfilled, (state, action: PayloadAction<{ results: Job[] }>) => {
        state.autocompleteLoading = false
        state.allJobs = action.payload.results || []
      })
      .addCase(fetchAllJobTitles.rejected, (state, action) => {
        state.autocompleteLoading = false
        state.error = action.payload as string
      })

      // Fetch job details
      .addCase(fetchJobDetails.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobDetails = action.payload
      })
  },
})

export const { clearJobSearch } = jobSlice.actions
export default jobSlice.reducer
