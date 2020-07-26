import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';

const theme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <HedgehogLab />
    </ThemeProvider>
  </div>
);

export default App;
