import React from "react";
import classes from "./background.module.css";
import { useTheme } from "@mui/material/styles";

export const Background = ({ children }) => {
  const theme = useTheme();
  return (
    <div
      className={[
        classes.bgc,
        theme.palette.mode === "light" ? classes.light : classes.dark,
      ].join(" ")}
    >
      {children}
    </div>
  );
};
