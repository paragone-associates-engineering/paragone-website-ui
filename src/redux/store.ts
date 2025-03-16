import { configureStore } from '@reduxjs/toolkit';
import themeReducer from "./slices/theme-slice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat();
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;