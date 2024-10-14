import { AppDispatch } from "../store";
import { completeProcess, failProcess, hideNotification } from "./processSlice";

export const runCompleteProcess = (msg:string) => (dispatch: AppDispatch) => {
  dispatch(completeProcess(msg));
  setTimeout(() => {
    dispatch(hideNotification());
  }, 3000);
};

export const runFailProcess = (errorMessage: string) => (dispatch: AppDispatch) => {
  dispatch(failProcess(errorMessage));
  setTimeout(() => {
    dispatch(hideNotification());
  }, 3000);
};
