import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./index";
import { selectAuth } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
