import React from 'react';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';

describe('AppComponent', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Projects dashboard')).toBeVisible();
  });
});
