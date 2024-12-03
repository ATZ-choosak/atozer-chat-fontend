import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthStateProp = {
  isAuthenticated: boolean;
};

const initialState: AuthStateProp = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const authSelector = (state: RootState) => state.authReducer;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
