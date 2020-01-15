import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import users from './containers/Users/reducers';
import { watchAll } from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    users
  }),
  {},
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
  //composeWithDevTools(applyMiddleware(logger, sagaMiddleware, thunk))
);

sagaMiddleware.run(watchAll);

export default store;
