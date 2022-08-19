import { createSlice } from "@reduxjs/toolkit";

export const defaultUser = {
  user: {
    email: "",
    phone: "",
    name: "",
    lastName: "",
    password: "",
    verificationCode: "",
    virificated: false,
    id: null,
  },
  authorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: defaultUser,
  reducers: {
    authorization: (state, action) => {
      return { user: { ...action.payload }, authorized: true };
    },
    updateUserData: (state, action) => {
      return { ...state, user: { ...action.payload } };
    },
    logout: (state) => {
      return {
        ...defaultUser,
      };
    },
  },
});

export const { authorization, logout, updateUserData } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectVirificated = (state) => state.auth.user.virificated;
export const selectAuth = (state) => state.auth.authorized;

export default authSlice.reducer;
