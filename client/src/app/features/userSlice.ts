import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserIBase } from "../globals";
import { RootState } from "../store";

export interface UserState {
  user: UserIBase | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<UserIBase>) {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<UserIBase>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    deleteUser(state) {
      state.user = null;
    },
  },
});
export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
export const userSelector = (state: RootState) => state.user;
