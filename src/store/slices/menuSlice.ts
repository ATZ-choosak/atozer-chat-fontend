import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProp = {
  menu: number;
};

const initialState: StateProp = {
  menu: 0,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeMenu: (state, action: PayloadAction<number>) => {
      state.menu = action.payload;
    },
  },
});

export const menuSelector = (state: RootState) => state.menuReducer;
export const { changeMenu } = menuSlice.actions;
export default menuSlice.reducer;
