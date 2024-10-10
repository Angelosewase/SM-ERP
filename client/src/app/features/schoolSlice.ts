import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { schoolIBase } from "../globals";
import { RootState } from "../store";

export interface SchoolState {
  school: schoolIBase | null;
  loading: boolean;
  error: string | null;
}

const initialState: SchoolState = {
  school: null,
  loading: false,
  error: null,
};
const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    fetchSchoolStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSchoolSuccess(state, action: PayloadAction<schoolIBase>) {
      state.school = action.payload;
      state.loading = false;
    },
    fetchSchoolFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
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

export const {
  fetchSchoolStart,
  fetchSchoolSuccess,
  setSchool,
  updateSchool,
  clearSchool,
  fetchSchoolFailure,
} = schoolSlice.actions;
export default schoolSlice.reducer;

export const schoolSelector =(state : RootState)=>state.school
