import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import AppRouter from "./app/router/app-router";
import Theme from "./app/theme/theme.component";
import { authorization } from "./features/auth/authSlice";
import { findUserById } from "./features/auth/utils/findUserById";
import { inicializeFavorites } from "./features/home/favoritesSlice";
import { findFavoritesByUserId } from "./features/home/utils/findFavoritesByUserId";
import { Menu } from "./features/menu/";
import { inicializeSettings } from "./features/profile/settingsSlice";
import { findSettingsByUserId } from "./features/profile/utils/findSettingsByUserId";
import { Background } from "./features/background/Background.component";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const user = findUserById(session);
      dispatch(authorization(user));
      const settings = findSettingsByUserId(session);
      dispatch(inicializeSettings(settings));
      const favorites = findFavoritesByUserId(session);
      dispatch(inicializeFavorites(favorites));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Theme>
          <Background>
            <>
              <Menu />
              <AppRouter />
            </>
          </Background>
        </Theme>
      )}
    </div>
  );
}

export default App;
