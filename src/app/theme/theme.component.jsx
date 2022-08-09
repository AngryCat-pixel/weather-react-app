import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dark, Light } from "./config";

export const ColorModeContext = React.createContext("light");

const Theme = ({ children }) => {
  const getDesignTokens = (mode) => ({
    ...(mode === "light" ? Light : Dark),
  });

  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
