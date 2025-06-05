/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { API_BASE_URL } from '../../services/api';

interface LocationItem {
  _id: string;
  id: string;
  region: string;
  city: string;
  country: string;
  postalCode: string;
  status?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface LocationsState {
  availableLocations: LocationItem[];
  stateLocations: LocationItem[];
  loadingAvailable: boolean;
  loadingState: boolean;
  errorAvailable: string | null;
  errorState: string | null;
 
  currentPage?: number;
  totalPages?: number;
  hasMorePages?: boolean;
}

const initialState: LocationsState = {
  availableLocations: [],
  stateLocations: [],
  loadingAvailable: false,
  loadingState: false,
  errorAvailable: null,
  errorState: null,
};

// export const fetchAvailableLocations = createAsyncThunk<LocationItem[], string | undefined>(
//   "locations/fetchAvailableLocations",
//   async (searchString = "", { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/listings/get-available-locations`);
//       const allLocations: LocationItem[] = response.data;

//       // Perform filtering on city, region, country, or postalCode
//       const filtered = searchString
//         ? allLocations.filter((loc) =>
//             [loc.city, loc.region, loc.country, loc.postalCode]
//               .join(" ")
//               .toLowerCase()
//               .includes(searchString.toLowerCase())
//           )
//         : allLocations;

//       return filtered;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Error fetching available locations");
//     }
//   }
// );

export const fetchAvailableLocations = createAsyncThunk<
  { locations: LocationItem[], totalPages: number, currentPage: number },
  { page?: number, searchString?: string }
>(
  "locations/fetchAvailableLocations",
  async ({ page = 1, searchString = '' }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/get-available-locations`, {
        params: { page, searchString }
      });
     // console.log(response.data)
      if (response.data) {
        return {
          locations: response.data,
          totalPages: response?.data?.length || 1,
          currentPage: page
        };
      }
      
      return {
        locations: response.data,
        totalPages: 1,
        currentPage: 1
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching state locations");
    }
  }
);

// Fetch full state location objects - Updated to handle new API structure
export const fetchStateLocations = createAsyncThunk<
  { locations: LocationItem[], totalPages: number, currentPage: number },
  { page?: number, searchString?: string }
>(
  "locations/fetchStateLocations",
  async ({ page = 1, searchString = '' }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/get-locations`, {
        params: { page, searchString }
      });
      
      if (response.data && response.data.results) {
        return {
          locations: response.data.results,
          totalPages: response.data.metadata[0]?.totalPages || 1,
          currentPage: page
        };
      }
      
      return {
        locations: response.data,
        totalPages: 1,
        currentPage: 1
      };
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
        state.loadingState = true;
        state.errorState = null;
      })
      .addCase(fetchAvailableLocations.fulfilled, (state, action) => {
        state.loadingState = false;
        state.availableLocations = action.payload.locations;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAvailableLocations.rejected, (state, action) => {
        state.loadingState = false;
        state.errorState = action.payload as string;
      })
      // For full state location objects
      .addCase(fetchStateLocations.pending, (state) => {
        state.loadingState = true;
        state.errorState = null;
      })
      .addCase(fetchStateLocations.fulfilled, (state, action) => {
        state.loadingState = false;
        state.stateLocations = action.payload.locations;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
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