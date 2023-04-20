import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// import { userRegister, userLogin } from "../Firebase/firebaseFunctions";

import { authenticatedUser } from "../@types/index.d";

const idSession = sessionStorage.getItem("id");
const uidSession = sessionStorage.getItem("uid");
const emailIDSession = sessionStorage.getItem("emailID");

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
  },
});

// for dispatch
export const { authUser } = authSlice.actions;

// for configureStore
export default authSlice.reducer;
