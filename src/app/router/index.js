import React from 'react';

import Confirm from '../../pages/ConfirmPage';
import Home from '../../pages/HomePage';
import Login from '../../pages/LoginPage';
import Profile from '../../pages/ProfilePage';
import Registration from '../../pages/RegistrationPage';
import Weather from '../../pages/WeatherPage';
import { ProtectRoute } from './protectRoute';

export const Routenames = {
  HOME: '/',
  WEATHER: "/weather",
  REGISTRATION: "/registration",
  LOGIN: "/login",
  PROFILE: "/profile",
  CONFIRM: "/confirm",
  ANY: "*",
};

export const routes = [
  {
    path: Routenames.HOME,
    element: (
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    ),
  },
  {
    path: Routenames.REGISTRATION,
    element: <Registration />,
  },
  {
    path: Routenames.LOGIN,
    element: <Login />,
  },
  {
    path: Routenames.CONFIRM,
    element: (
      <ProtectRoute>
        <Confirm />
      </ProtectRoute>
    ),
  },
  {
    path: Routenames.PROFILE,
    element: (
      <ProtectRoute>
        <Profile />
      </ProtectRoute>
    ),
  },
  {
    path: Routenames.WEATHER,
    element: (
      <ProtectRoute>
        <Weather />
      </ProtectRoute>
    ),
  },
  {
    path: Routenames.ANY,
    element: (
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    ),
  },
];
