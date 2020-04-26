import { createReducer } from '@reduxjs/toolkit';
import generateReducer from './genericReducers';
import generateactions from './genericActions';

const initialState = {
  listData: {
    count: 0,
    results: []
  },
  errors: {},
  loading: false,
  reqStatus: {}
};

class ModelReduxRest {
  constructor(config, state = initialState, reducerManager = {}, actions = {}) {
    this.config = config;
    this.actions = generateactions(config.entityName, config.ApiUrl, actions);

    this.reducer = this.initializeReducer(state, reducerManager);
  }

  initializeReducer = (state, reducerManager) =>
    createReducer(state, {
      ...generateReducer(this.config.entityName),
      ...reducerManager
    });
}

export default ModelReduxRest;
