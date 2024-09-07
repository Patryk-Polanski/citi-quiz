import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type AuthTypes = {
  user: User | null;
};

const initialState: AuthTypes = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthTypes["user"]>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
