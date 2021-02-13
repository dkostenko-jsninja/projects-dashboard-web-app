import React from 'react';
import './App.scss';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import Home from './components/Home';

function App() {
  return (
    <div className="c-app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Projects dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Home />
    </div>
  );
}

export default App;
