import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dark, Light } from './config';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../features/profile/settingsSlice';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Theme = ({ children }) => {
    const getDesignTokens = (mode) => ({
        ...(mode === 'light' ? Light : Dark),
    });

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const settings = useSelector(selectSettings);
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    useEffect(() => {
        if (theme.palette.mode !== settings.theme) {
            colorMode.toggleColorMode();
        }
    }, [settings.theme]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Theme;
