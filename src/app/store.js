import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authReducer from "../features/auth/authSlice";
import favoritesReducer from "../features/home/favoritesSlice";
import settingsReducer from "../features/profile/settingsSlice";
import { weatherAPI } from "../features/weather/weatherAPI";

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  favorites: favoritesReducer,
  [weatherAPI.reducerPath]: weatherAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherAPI.middleware),
});

setupListeners(store.dispatch);
