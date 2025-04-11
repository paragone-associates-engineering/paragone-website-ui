/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { API_BASE_URL } from '../../services/api';

interface LocationItem {
  _id: string;
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LocationsState {
  availableLocations: string[];
  stateLocations: LocationItem[];
  loadingAvailable: boolean;
  loadingState: boolean;
  errorAvailable: string | null;
  errorState: string | null;
}

const initialState: LocationsState = {
  availableLocations: [],
  stateLocations: [],
  loadingAvailable: false,
  loadingState: false,
  errorAvailable: null,
  errorState: null,
};

// Fetch available location strings (existing implementation)
export const fetchAvailableLocations = createAsyncThunk<string[]>(
  "locations/fetchAvailableLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/get-available-locations`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching available locations");
    }
  }
);

// Fetch full state location objects
export const fetchStateLocations = createAsyncThunk<LocationItem[]>(
  "locations/fetchStateLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/get-locations`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching state locations");
    }
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For available location strings
      .addCase(fetchAvailableLocations.pending, (state) => {
        state.loadingAvailable = true;
        state.errorAvailable = null;
      })
      .addCase(fetchAvailableLocations.fulfilled, (state, action) => {
        state.loadingAvailable = false;
        state.availableLocations = action.payload;
      })
      .addCase(fetchAvailableLocations.rejected, (state, action) => {
        state.loadingAvailable = false;
        state.errorAvailable = action.payload as string;
      })

      // For full state location objects
      .addCase(fetchStateLocations.pending, (state) => {
        state.loadingState = true;
        state.errorState = null;
      })
      .addCase(fetchStateLocations.fulfilled, (state, action) => {
        state.loadingState = false;
        state.stateLocations = action.payload;
      })
      .addCase(fetchStateLocations.rejected, (state, action) => {
        state.loadingState = false;
        state.errorState = action.payload as string;
      });
  },
});

// Selectors
export const selectAvailableLocations = (state: RootState) => state.locations.availableLocations;
export const selectStateLocations = (state: RootState) => state.locations.stateLocations;

export default locationsSlice.reducer;
