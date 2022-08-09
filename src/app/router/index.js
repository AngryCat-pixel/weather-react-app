import React from "react";
import Registration from "../../pages/RegistrationPage";
import Login from "../../pages/LoginPage";
import Profile from "../../pages/ProfilePage";
import { Weather } from "../../pages/Weather";
import { ProtectRoute } from "./protectRoute";

export const Routenames = {
  WEATHER: "/",
  REGISTRATION: "/registration",
  LOGIN: "/login",
  PROFILE: "/profile",
  ANY: "*",
};

export const routes = [
  {
    path: Routenames.REGISTRATION,
    element: <Registration />,
  },
  {
    path: Routenames.LOGIN,
    element: <Login />,
  },
  {
    path: Routenames.PROFILE,
    element: <Profile />,
  },
  {
    path: Routenames.ANY,
    element: (
      <ProtectRoute>
        <Weather />
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
];
