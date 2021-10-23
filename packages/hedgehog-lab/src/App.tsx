import React from 'react';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';
import {SnackbarProvider} from "notistack";
import {labTheme} from "./config/labTheme";

const App = (): React.ReactElement => (
    <div className="App">
        <SnackbarProvider maxSnack={3}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={labTheme}>
                    <HedgehogLab/>
                </ThemeProvider>
            </StyledEngineProvider>
        </SnackbarProvider>
    </div>
);

export default App;
