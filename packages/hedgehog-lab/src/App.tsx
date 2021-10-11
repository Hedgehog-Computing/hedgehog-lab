import React from 'react';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';
import theme from "./config/theme";
import {SnackbarProvider} from "notistack";

const App = (): React.ReactElement => (
    <div className="App">
        <SnackbarProvider maxSnack={3}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <HedgehogLab/>
                </ThemeProvider>
            </StyledEngineProvider>
        </SnackbarProvider>
    </div>
);

export default App;
