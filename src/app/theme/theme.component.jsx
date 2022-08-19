import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo, createContext } from "react";
import { Dark, Light } from "./config";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const Theme = ({ children }) => {
  const getDesignTokens = (mode) => ({
    ...(mode === "light" ? Light : Dark),
  });

  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
