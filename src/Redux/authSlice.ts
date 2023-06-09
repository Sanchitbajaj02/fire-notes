import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// import { userRegister, userLogin } from "../Firebase/firebaseFunctions";

import { authenticatedUser } from "../@types/index.d";

const idSession = localStorage.getItem("id");
const uidSession = localStorage.getItem("uid");
const emailIDSession = localStorage.getItem("emailID");

const initialState: authenticatedUser = {
  id: idSession || "",
  uid: uidSession || "",
  emailID: emailIDSession || "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authUser(
      state: authenticatedUser,
      action: PayloadAction<authenticatedUser>
    ) {
      state.id = action.payload.id;
      state.uid = action.payload.uid;
      state.emailID = action.payload.emailID;
    },

    unAuthUser(state: authenticatedUser = initialState) {
      state.id = "";
      state.uid = "";
      state.emailID = "";
    },
  },
});

// for dispatch
export const { authUser, unAuthUser } = authSlice.actions;

// for configureStore
export default authSlice.reducer;
