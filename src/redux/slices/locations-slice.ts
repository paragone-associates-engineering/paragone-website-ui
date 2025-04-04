/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store"; 
import { API_BASE_URL } from '../../services/api';


interface LocationsState {
  locations: string[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LocationsState = {
  locations: [],
  loading: false,
  error: null,
};

// Async thunk for fetching locations
export const fetchLocations = createAsyncThunk<string[]>(
  "locations/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/get-available-locations`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching locations");
    }
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectLocations = (state: RootState) => state.locations;

export default locationsSlice.reducer;
