import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from 'reducers';

const store = createStore(
  reducers,
  {},
  composeWithDevTools(compose(applyMiddleware(thunk, logger)))
);

export default store;
