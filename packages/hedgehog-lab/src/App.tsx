import React from 'react';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {SnackbarProvider} from "notistack";
import {labTheme} from "./themes/labTheme";
import {BrowserRouter} from "react-router-dom";
import {RoutePage} from "./route/route";
import {RecoilRoot, useRecoilValue} from "recoil";
import {themeModState} from "./themes/RThemeStates";
import {Compiler} from "./components/Compiler/Compiler";


const ThemePage = () => {
    const themeMode = useRecoilValue(themeModState)

    return (
        <ThemeProvider theme={labTheme(themeMode)}>
            <Compiler/>
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
