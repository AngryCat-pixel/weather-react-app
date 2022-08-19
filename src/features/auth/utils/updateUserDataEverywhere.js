import { saveUser } from ".";
import { updateUserData } from "../authSlice";

export const updateUserDataEverywhere = (dispatch, user) => {
  saveUser(user);
  dispatch(updateUserData(user));
};
