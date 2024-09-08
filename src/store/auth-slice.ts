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
    setUserName(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.displayName = action.payload;
      }
    },
  },
});

export const { setUser, setUserName } = authSlice.actions;
