import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import developerReducer from './developer/developer.reducer';
import requestStatusReducer from './request-status/request-status.reducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ developerReducer, requestStatusReducer }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
