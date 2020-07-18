import React, { Component } from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import HedgehogLab from './HedgehogLab';
import GlobalAppBar from './components/layout/GlobalAppBar';

const darkTheme = true
const darlBackgroundColor = "#1f2227"
const lightBackgroundColor = "#fff"

const theme = createMuiTheme({
  palette: {
    background: {
      default: darkTheme ? darlBackgroundColor : lightBackgroundColor,
    },

    primary: {
      main: darkTheme ? '#1a1d21' : lightBackgroundColor,
    },

    type: darkTheme ? 'dark' : 'light'
  }
});

const AppLayout = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <div style={{ flexGrow: 1 }}>
      <div className="App">
        <GlobalAppBar />
      </div>
    </div>

    <HedgehogLab />
  </ThemeProvider>
);

class App extends Component {
  constructor(props) {
    super(props)
    this.setState({ appTheme: theme})
  }

  render() {
    return <AppLayout />
  }
}

export default App;
