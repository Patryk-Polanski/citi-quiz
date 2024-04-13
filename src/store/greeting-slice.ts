import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type greetingTypes = {
  emojiIndex: number | null;
};

const initialState: greetingTypes = {
  emojiIndex: null,
};

export const greetingSlice = createSlice({
  name: "greeting",
  initialState,
  reducers: {
    setGreeting(state, action: PayloadAction<greetingTypes["emojiIndex"]>) {
      state.emojiIndex = action.payload;
    },
  },
});

export const { setGreeting } = greetingSlice.actions;
