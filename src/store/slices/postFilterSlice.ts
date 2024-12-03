import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum FilterType {
  Recents,
  Friends,
  Popular,
}

type StateProp = {
  filter: FilterType;
};

const initialState: StateProp = {
  filter: FilterType.Recents,
};

const postFilterSlice = createSlice({
  name: "postFilter",
  initialState,
  reducers: {
    changePostFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

export const postFilterSelector = (state: RootState) => state.postFilterReducer;
export const { changePostFilter } = postFilterSlice.actions;
export default postFilterSlice.reducer;
