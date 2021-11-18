import React from 'react';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {SnackbarProvider} from "notistack";
import {labTheme} from "./config/themes/labTheme";
import {BrowserRouter} from "react-router-dom";
import {RoutePage} from "./config/route/route";
import {RecoilRoot, useRecoilValue} from "recoil";
import {themeModState} from "./config/themes/RThemeStates";


const ThemePage = () => {
    const themeMode = useRecoilValue(themeModState)

    return (
        <ThemeProvider theme={labTheme(themeMode)}>
            <RoutePage/>
        </ThemeProvider>
    )
}

const App = (): React.ReactElement => {
    return (
        <div className="App">
            <RecoilRoot>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={3}>
                        <StyledEngineProvider injectFirst>
                            <ThemePage/>
                        </StyledEngineProvider>
                    </SnackbarProvider>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}

export default App;
