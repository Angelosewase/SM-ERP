import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProcessState {
  status: "idle" | "inProgress" | "completed" | "failed";
  message: string;
  showNotification: boolean;
}

const initialState: ProcessState = {
  status: "idle",
  message: "",
  showNotification: false,
};

const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    startProcess: (state) => {
      state.status = "inProgress";
      state.message = "Operation started successfully.";
      state.showNotification = true;
    },
    completeProcess: (state) => {
      state.status = "completed";
      state.message = "Operation completed successfully.";
      state.showNotification = true;
    },
    failProcess: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.message = action.payload || "An error occurred during the operation.";
      state.showNotification = true;
    },
    hideNotification: (state) => {
      state.showNotification = false;
    },
    resetProcess: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
});

export const {
  startProcess,
  completeProcess,
  failProcess,
  hideNotification,
  resetProcess,
} = processSlice.actions;

export default processSlice.reducer;

export const processSelector = (state: RootState) => state.process;
