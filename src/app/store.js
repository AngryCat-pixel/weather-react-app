import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import settingsReducer from '../features/profile/settingsSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
  },
});
