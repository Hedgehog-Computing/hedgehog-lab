import React, { useEffect } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';
import { SnackbarProvider } from "notistack";
import { labTheme } from "./config/labTheme";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const App = (): React.ReactElement => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    return (
        <div className="App">
            <SnackbarProvider maxSnack={3}>
                <StyledEngineProvider injectFirst>
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={labTheme(mode)}>
                            <HedgehogLab />
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                </StyledEngineProvider>
            </SnackbarProvider>
        </div>
    );
}

export default App;
