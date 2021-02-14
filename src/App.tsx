import React, { useEffect, useState } from 'react';
import './App.scss';

import { AppBar, Snackbar, Toolbar, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

import { RootSate } from './types/store-types';

import Home from './components/Home';

function App() {
  const { requestError } = useSelector((state: RootSate) => state.requestStatusReducer);

  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    setError(requestError);
  }, [requestError]);

  const handleSnackbarClose = () => {
    setError(null);
  };

  return (
    <div className="c-app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Projects dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Home />

      <Snackbar
        open={!!error}
        onClick={handleSnackbarClose}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default App;
