import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SettingsTypes = {
  fontSize: string;
  background: string;
};

const initialState: SettingsTypes = {
  fontSize: "medium",
  background: "bg-sky-600",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<SettingsTypes>) {
      state.fontSize = action.payload.fontSize;
      state.background = action.payload.background;
    },
    setFontSize(state, action: PayloadAction<SettingsTypes["fontSize"]>) {
      state.fontSize = action.payload;
    },
    setBackground(state, action: PayloadAction<SettingsTypes["background"]>) {
      state.background = action.payload;
    },
  },
});

export const { setSettings, setFontSize, setBackground } =
  settingsSlice.actions;
