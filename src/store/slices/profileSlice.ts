import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { profile, profileResponse } from "@/models/auth.model";

const initialState: profile = {
  profile: {
    _id: "",
    email: "abc@gmail.com",
    image:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    is_verify: true,
    name: "Choosak kwanraksri",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<profileResponse>) => {
      state.profile = action.payload;
    },
  },
});

export const profileSelector = (state: RootState) => state.profileReducer;
export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
