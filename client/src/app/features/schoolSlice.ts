import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { schoolIBase } from "../globals";

interface SchoolState {
  school: schoolIBase | null;
}

const initialState: SchoolState = {
  school: null,
};
const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setSchool(state, action: PayloadAction<schoolIBase>) {
      state.school = action.payload;
    },
    updateSchool(state, action: PayloadAction<Partial<schoolIBase>>) {
      if (state.school) {
        state.school = { ...state.school, ...action.payload };
      }
    },
    clearSchool(state) {
      state.school = null;
    },
  },
});

export const { setSchool, updateSchool, clearSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
