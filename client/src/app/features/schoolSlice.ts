import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { schoolIBase } from "../globals";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { SubmitSchoolInfo, SubmitUserInfo } from "../Api/SignUp";
import { runCompleteProcess, runFailProcess } from "./proccesThunk";

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

// Create async thunk for school registration
export const registerSchoolAndUser = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchSchoolStart());

    // First create the user
    const userData = {
      firstName: formData.adminFirstName,
      lastName: formData.adminLastName,
      email: formData.adminEmail,
      password: formData.password,
    };

    const userId = await SubmitUserInfo(userData);
    if (!userId) {
      dispatch(runFailProcess("Failed to create user"));
      return null;
    }
    const schoolData = {
      schoolName: formData.schoolName,
      address: formData.schoolLocation,
      email: formData.schoolEmail,
      admin: userId,
    };

    const schoolResponse = await SubmitSchoolInfo(schoolData);
    console.log(schoolResponse)
    if (!schoolResponse) {
      dispatch(runFailProcess("Failed to create school"));
      return null;
    }

    dispatch(fetchSchoolSuccess(schoolResponse));
    dispatch(runCompleteProcess("School account created successfully"));
    return schoolResponse;

  } catch (error) {
    dispatch(fetchSchoolFailure(error as string));
    dispatch(runFailProcess(error as string));
    return null;
  }
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
      console.log("fetchSchoolSuccess action payload:", action.payload);
      state.school = action.payload;
      state.loading = false;
    },
    fetchSchoolFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSchool(state, action: PayloadAction<schoolIBase>) {
      console.log("setting school", action.payload)
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
