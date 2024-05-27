import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type GreetingTypes = {
  emojiIndex: number | null;
};

const initialState: GreetingTypes = {
  emojiIndex: null,
};

export const greetingSlice = createSlice({
  name: "greeting",
  initialState,
  reducers: {
    setGreeting(state, action: PayloadAction<GreetingTypes["emojiIndex"]>) {
      state.emojiIndex = action.payload;
    },
  },
});

export const { setGreeting } = greetingSlice.actions;
