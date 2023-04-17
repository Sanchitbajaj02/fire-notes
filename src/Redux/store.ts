import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./Reducers";

const store = configureStore({
  reducer: {
    notesSlicer: notesReducer,
  },
});

export default store;
