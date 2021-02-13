import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import developerReducer from './developer/developer.reducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ developerReducer }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
