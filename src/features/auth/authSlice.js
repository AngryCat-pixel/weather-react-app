import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

const initialState = {
  user: { email: "", phone: "", name: "", lastName: "", password: "" },
  authorized: false,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    authorization: (state, action) => {
      
      return { user: { ...action.payload }, authorized: true };
    },
    logout: (state) => {
      return {
        user: {
          email: "",
          phone: "",
          name: "",
          lastName: "",
          password: "",
          verificationCode: "",
          virificated: false,
        },
        authorized: false,
      };
    },
  },
});

export const { authorization, logout} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuth = (state) => state.auth.authorized;

export default authSlice.reducer;