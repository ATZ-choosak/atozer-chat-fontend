import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import menuReducer from "./slices/menuSlice";
import postFilterReducer from "./slices/postFilterSlice";
import profileReducer from "./slices/profileSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: { menuReducer, postFilterReducer, profileReducer, authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
