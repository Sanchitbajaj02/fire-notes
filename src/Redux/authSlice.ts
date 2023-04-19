import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { userRegister, userLogin } from "../Firebase/firebaseFunctions";

import { UserDataType } from "../@types/index.d";

const initialState: UserDataType = {
  id: "",
  uid: "",
  emailID: "",
  password: "",
};

const registerUser = (
  state: UserDataType = initialState,
  action: PayloadAction<UserDataType>
) => {
  const userData = action.payload;

  userRegister(userData)
    .then((resp) => {
      console.log(resp);
      // return resp;
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginUser = (
  state: UserDataType = initialState,
  action: PayloadAction<UserDataType>
) => {
  const userData = action.payload;

  userLogin(userData)
    .then((resp) => {
      console.log(resp);
      // return resp;
    })
    .catch((err) => {
      console.log(err);
    });
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    register: registerUser,
    login: loginUser,
  },
});

// for dispatch
export const { register, login } = authSlice.actions;

// for configureStore
export default authSlice.reducer;
