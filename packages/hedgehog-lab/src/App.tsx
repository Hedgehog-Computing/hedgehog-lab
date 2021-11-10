import React from 'react';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {SnackbarProvider} from "notistack";
import {labTheme} from "./config/labTheme";
import {BrowserRouter} from "react-router-dom";
import {RoutePage} from "./config/route/route";
import {RecoilRoot} from "recoil";

export const ColorModeContext = React.createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleColorMode: () => {
    }
});

const App = (): React.ReactElement => {
    // theme
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
            <RecoilRoot>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={3}>
                        <StyledEngineProvider injectFirst>
                            <ColorModeContext.Provider value={colorMode}>
                                <ThemeProvider theme={labTheme(mode)}>
                                    <RoutePage/>
                                </ThemeProvider>
                            </ColorModeContext.Provider>
                        </StyledEngineProvider>
                    </SnackbarProvider>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}

export default App;
