import React, { useEffect, useContext } from "react";
import AppRouter from "./app/router/app-router";
import Theme from "./app/theme/theme.component";
import { authorization } from "./features/auth/authSlice";
import { inicializeSettings } from "./features/profile/settingsSlice";
import { useDispatch } from "react-redux";
import { ColorModeContext } from "./app/theme/theme.component";
import { useTheme } from "@mui/material/styles";
import { findUserById } from "./features/auth/utils/findUserById";
import { findSettingsByUserId } from "./features/profile/utils/findSettingsByUserId";

function App() {
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    console.log("BOT ONO");
    const session = localStorage.getItem("session");
    if (session) {
      const user = findUserById(session);
      dispatch(authorization(user));
      const settings = findSettingsByUserId(session);
      dispatch(inicializeSettings(settings));
      if (theme.palette.mode !== settings.theme) {
        colorMode.toggleColorMode();
      }
    }
  }, []);
  return (
    <div className="App">
      <Theme>
        <AppRouter />
      </Theme>
    </div>
  );
}

export default App;
