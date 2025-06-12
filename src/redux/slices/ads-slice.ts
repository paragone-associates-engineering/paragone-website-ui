import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
//import type { Ad } from "../../types/ads"

export interface Ad {
  id: string
  title: string
  image: string
}

interface AdsState {
  ads: Ad[]
  loading: boolean
  error: string | null
}

const initialState: AdsState = {
  ads: [],
  loading: false,
  error: null,
}

export const fetchAds = createAsyncThunk("ads/fetchAds", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://paragone-website-backend.onrender.com/ads/get-ads")
    return response.data
  } catch  {
    return rejectWithValue("Failed to fetch ads")
  }
})

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false
        state.ads = action.payload
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default adsSlice.reducer
