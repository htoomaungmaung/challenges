import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from './modules';

const PRODUCTION = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers(reducers);

// Redux DevTools Extension
const composeEnhancers =
  !PRODUCTION && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default function configureStore(initialState) {
  const middlewares = [thunk];
  if (!PRODUCTION) {
    middlewares.push(logger);
  }
  return createStore(
    rootReducer,
    initialState,    
    composeEnhancers(applyMiddleware(...middlewares))
  );
}