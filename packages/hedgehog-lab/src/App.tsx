import React from 'react';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';
import theme from "./config/theme";

const App = (): React.ReactElement => (
    <div className="App">
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <HedgehogLab/>
            </ThemeProvider>
        </StyledEngineProvider>
    </div>
);

export default App;
