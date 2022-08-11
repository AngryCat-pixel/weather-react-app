import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./index";

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
