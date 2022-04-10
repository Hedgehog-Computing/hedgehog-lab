import React, {useEffect} from "react";
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import "./App.css";
import {SnackbarProvider} from "notistack";
import {labTheme} from "./themes/labTheme";
import {BrowserRouter} from "react-router-dom";
import {RoutePage} from "./route/route";
import {RecoilRoot, useRecoilState} from "recoil";
import {themeModState} from "./themes/RThemeStates";
import useSystemTheme from "./hooks/useSystemTheme";
import {Box} from "@mui/material";

const ThemePage = () => {
    const [themeMode, setThemeMode] = useRecoilState(themeModState);
    const systemTheme = useSystemTheme();
    useEffect(() => {
        const localTheme = localStorage.getItem("theme");

        localTheme ? setThemeMode(localTheme) : setThemeMode(systemTheme);
    }, [systemTheme, setThemeMode]);

    return (
        <ThemeProvider theme={labTheme(themeMode)}>
            <RoutePage/>
        </ThemeProvider>
    );
};


const App = (): React.ReactElement => {
    return (
        <div className="App">
            {/*// @ts-ignore */}
            <RecoilRoot>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={3}>
                        <StyledEngineProvider injectFirst>
                            <Box sx={{pb: 1}}>
                                <ThemePage/>
                            </Box>
                        </StyledEngineProvider>
                    </SnackbarProvider>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
};

export default App;
