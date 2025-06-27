import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Event, EventsResponse, EventApplication, EventsQueryParams } from "../../types/events"

interface EventsState {
  events: Event[]
  allEvents: Event[] // Store all events for frontend filtering
  selectedEvent: Event | null
  totalCount: number
  currentPage: number
  pageSize: number
  loading: boolean
  error: string | null
  applicationLoading: boolean
  applicationSuccess: boolean
  filters: EventsQueryParams
}

const initialState: EventsState = {
  events: [],
  allEvents: [],
  selectedEvent: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 12,
  loading: false,
  error: null,
  applicationLoading: false,
  applicationSuccess: false,
  filters: {},
}

// Frontend filtering function
const applyFilters = (events: Event[], filters: EventsQueryParams) => {
  let filtered = [...events]

  // Filter by event type
  if (filters.eventType) {
    filtered = filtered.filter((event) => event.eventType === filters.eventType)
  }

  // Filter by paid/free
  if (filters.isPaid !== undefined) {
    filtered = filtered.filter((event) => event.isPaid === filters.isPaid)
  }

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter((event) => event.status === filters.status)
  }

  return filtered
}

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: EventsQueryParams = {}, { rejectWithValue }) => {
    try {
      // Fetch all events without backend filtering
      const response = await axios.get<EventsResponse>(
        "https://paragone-website-backend.onrender.com/event/get-events",
        {
          params: {
            page: 1,
            pageSize: 1000, // Get all events for frontend filtering
          },
        },
      )

      return {
        events: response.data.results,
        totalCount: response.data.metadata[0]?.total || 0,
        filters: params,
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
      // Apply pagination to filtered events
      const filteredEvents = applyFilters(state.allEvents, state.filters)
      const startIndex = (action.payload - 1) * state.pageSize
      const endIndex = startIndex + state.pageSize
      state.events = filteredEvents.slice(startIndex, endIndex)
      state.totalCount = filteredEvents.length
    },
    setFilters: (state, action: PayloadAction<EventsQueryParams>) => {
      state.filters = action.payload
      state.currentPage = 1
      // Apply filters and pagination
      const filteredEvents = applyFilters(state.allEvents, action.payload)
      state.events = filteredEvents.slice(0, state.pageSize)
      state.totalCount = filteredEvents.length
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
        state.allEvents = action.payload.events
        state.filters = action.payload.filters
        // Apply initial filters
        const filteredEvents = applyFilters(action.payload.events, action.payload.filters)
        state.events = filteredEvents.slice(0, state.pageSize)
        state.totalCount = filteredEvents.length
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

export const { setCurrentPage, setFilters, clearSelectedEvent, clearApplicationSuccess, clearError } =
  eventsSlice.actions
export default eventsSlice.reducer
