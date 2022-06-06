import React, {useEffect} from "react";
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import "./App.css";
import {SnackbarProvider} from "notistack";
import {labTheme} from "./themes/labTheme";
import {BrowserRouter, useLocation} from "react-router-dom";
import {RoutePage} from "./route/route";
import {RecoilRoot, useResetRecoilState} from "recoil";
import {useAuth} from "./hooks/useAuth";
import {useEffectOnce} from "react-use";
import {pageView} from "./utils/ga4";
import useCurrentRoute from "./hooks/useCurrentRoute";
import {searchState} from "./states/RSnippetStates";

const ThemePage = () => {
    const resetSearch = useResetRecoilState(searchState)
    const {me} = useAuth()
    useEffectOnce(() => {
        me()
    })

    const {meta} = useCurrentRoute();

    const title = meta?.title ?? 'HLab';
    useEffect(() => {
        document.title = `${title} - Hedgehog Lab`;
        resetSearch()
    }, [meta]);

    // and use it like
    const location = useLocation()
    pageView(location.pathname)

    return (
        <ThemeProvider theme={labTheme()}>
            <RoutePage/>
        </ThemeProvider>
    );
};


const App = (): React.ReactElement => {
    return (
        <div className="App">
            {/*// @ts-ignore */}
            <RecoilRoot>
                <React.Suspense fallback={'loading...'}>
                    <BrowserRouter>
                        <SnackbarProvider maxSnack={3}>
                            <StyledEngineProvider injectFirst>
                                <ThemePage/>
                            </StyledEngineProvider>
                        </SnackbarProvider>
                    </BrowserRouter>
                </React.Suspense>
            </RecoilRoot>
        </div>
    );
};

export default App;
