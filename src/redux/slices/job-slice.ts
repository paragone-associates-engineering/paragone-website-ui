/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_BASE_URL } from '../../services/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Job {
  _id: string;
  id: string;
  title: string;
  department: string;
  location: string;
  duties: string;
  skills: string;
  experience: string;
  description: string;
  education: string;
}

interface JobState {
  jobs: Job[];
  jobDetails: Job | null;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: JobState = {
  jobs: [],
  jobDetails: null,
  totalPages: 1,
  loading: false,
  error: null,
};

// Fetch jobs with pagination
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/get-jobs?page=${page}`);
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue("Failed to fetch jobs");
    }
  }
);

// Fetch single job details
export const fetchJobDetails = createAsyncThunk(
  "jobs/fetchJobDetails",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/get-job/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch job details");
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<{ results: Job[]; metadata: { totalPages: number }[] }>) => {
        state.loading = false;
        state.jobs = action.payload.results;  // Extract job listings from "results"
        state.totalPages = action.payload.metadata[0]?.totalPages || 1; // Extract totalPages safely
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobDetails = action.payload;
      });
  },
});

export default jobSlice.reducer;
