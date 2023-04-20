import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./noteSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    notesSlicer: notesReducer,
    authSlicer: authReducer,
  },
});

export default store;

export const RootState = typeof store.getState;
