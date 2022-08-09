import React, { useEffect } from "react";
import AppRouter from "./app/router/app-router";
import Theme from "./app/theme/theme.component";
import { authorization } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("session"));
    if (user) {
      dispatch(authorization(user));
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
