import React from 'react';
import './App.css';
import HedgehogLab from './HedgehogLab';
import { Container } from '@material-ui/core';
import GlobalAppBar from './components/layout/GlobalAppBar';

const App = () => (
  <Container maxWidth="xl">
    <div style={{ flexGrow: 1 }}>
      <div className="App">
        <GlobalAppBar />
      </div>
    </div>

    <HedgehogLab />
  </Container>
);

export default App;
