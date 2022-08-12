import { useTheme } from '@mui/material/styles';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppRouter from './app/router/app-router';
import Theme, { ColorModeContext } from './app/theme/theme.component';
import { authorization } from './features/auth/authSlice';
import { findUserById } from './features/auth/utils/findUserById';
import { inicializeSettings } from './features/profile/settingsSlice';
import { findSettingsByUserId } from './features/profile/utils/findSettingsByUserId';

function App() {
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
