import React from 'react';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme(adaptV4Theme({
  palette: {
    mode: 'light'
  }
}));

const App = (): React.ReactElement => (
  <div className="App">
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HedgehogLab />
      </ThemeProvider>
    </StyledEngineProvider>
  </div>
);

export default App;
