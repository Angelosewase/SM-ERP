import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "./features/schoolSlice";
import userReducer from "./features/userSlice";

import processReducer from "./features/processSlice";

const store = configureStore({
  reducer: {
    school: schoolReducer,
    user: userReducer,
    process: processReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
