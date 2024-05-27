import { configureStore } from "@reduxjs/toolkit";
import { statsSlice } from "./stats-slice";
import { greetingSlice } from "./greeting-slice";
import { settingsSlice } from "./settings-slice";

export const store = configureStore({
  reducer: {
    stats: statsSlice.reducer,
    greeting: greetingSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
