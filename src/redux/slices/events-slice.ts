import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Event, EventsResponse, EventApplication, EventsQueryParams } from "../../types/events"

interface EventsState {
  events: Event[]
  selectedEvent: Event | null
  totalCount: number
  currentPage: number
  pageSize: number
  loading: boolean
  error: string | null
  applicationLoading: boolean
  applicationSuccess: boolean
}

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 12,
  loading: false,
  error: null,
  applicationLoading: false,
  applicationSuccess: false,
}

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: EventsQueryParams = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get<EventsResponse>(
        "https://paragone-website-backend.onrender.com/event/get-events",
        {
          params: {
            page: params.page || 1,
            pageSize: params.pageSize || 12,
            ...params,
          },
        },
      )

      return {
        events: response.data.results,
        totalCount: response.data.metadata[0]?.total || 0,
        totalPages: response.data.metadata[0]?.totalPages || 0,
      }
    } catch (error) {
      console.error("Error fetching events:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch events")
    }
  },
)

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (eventId: string, { rejectWithValue }) => {
    try {
      // Since there's no specific endpoint for single event, we'll filter from the events list
      // In a real app, you'd have a dedicated endpoint
      const response = await axios.get<EventsResponse>("https://paragone-website-backend.onrender.com/event/get-events")
      const event = response.data.results.find((e) => e.id === eventId)

      if (!event) {
        throw new Error("Event not found")
      }

      return event
    } catch (error) {
      console.error("Error fetching event:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch event")
    }
  },
)

export const applyToEvent = createAsyncThunk(
  "events/applyToEvent",
  async ({ eventId, application }: { eventId: string; application: EventApplication }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://paragone-website-backend.onrender.com/event/apply/${eventId}`,
        application,
      )
      return response.data
    } catch (error) {
      console.error("Error applying to event:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to apply to event")
    }
  },
)

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null
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
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload.events
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(applyToEvent.pending, (state) => {
        state.applicationLoading = true
        state.error = null
        state.applicationSuccess = false
      })
      .addCase(applyToEvent.fulfilled, (state) => {
        state.applicationLoading = false
        state.applicationSuccess = true
      })
      .addCase(applyToEvent.rejected, (state, action) => {
        state.applicationLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentPage, clearSelectedEvent, clearApplicationSuccess, clearError } = eventsSlice.actions
export default eventsSlice.reducer
