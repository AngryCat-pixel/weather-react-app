import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import authReducer from '../features/auth/authSlice';
import { weatherAPI } from '../features/main/weatherAPI';
import settingsReducer from '../features/profile/settingsSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    [weatherAPI.reducerPath]: weatherAPI.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherAPI.middleware),
});

setupListeners(store.dispatch)