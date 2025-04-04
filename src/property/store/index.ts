import { configureStore } from "@reduxjs/toolkit"
import listingsReducer from "./listings-slice"

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

