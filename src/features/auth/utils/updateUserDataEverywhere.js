import { updateUserData } from '../authSlice';
import { createSession, saveUser } from '.';

export const updateUserDataEverywhere = (dispatch, user) => {
    // сохранение в localStorage
    saveUser(user);
    // сохранение в глобальный стейт
    dispatch(updateUserData(user));
};
