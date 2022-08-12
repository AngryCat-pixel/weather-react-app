import { saveUser } from '.';
import { updateUserData } from '../authSlice';

export const updateUserDataEverywhere = (dispatch, user) => {
    // сохранение в localStorage
    saveUser(user);
    // сохранение в глобальный стейт
    dispatch(updateUserData(user));
};
