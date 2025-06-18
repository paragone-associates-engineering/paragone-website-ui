import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/theme-slice";
import listingsReducer from "../slices/listings-slice"; 
import blogReducer from '../slices/blog-slice';
import jobReducer from '../slices/job-slice';
import locationsReducer from "../slices/locations-slice";
import adsReducer from "../slices/ads-slice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    listings: listingsReducer, 
    locations: locationsReducer,
    blog: blogReducer,
    jobs: jobReducer,
     ads: adsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
