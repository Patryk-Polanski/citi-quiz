import { configureStore } from "@reduxjs/toolkit";
import { statsSlice } from "./stats-slice";

export const store = configureStore({
  reducer: {
    stats: statsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
