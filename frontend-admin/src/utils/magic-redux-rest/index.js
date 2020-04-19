import { createReducer } from '@reduxjs/toolkit';
import generateReducer from './genericReducers';
import generateactions from './genericActions';

const genericInitialState = {
  listData: {
    count: 0,
    results: []
  },
  errors: {},
  loading: false,
  reqStatus: {}
};

const APIRestMaker = (function(my) {
  my.reducer = (
    initialState = genericInitialState,
    reducerCustomManager = {}
  ) =>
    createReducer(initialState, {
      ...generateReducer(my.config.entityName),
      ...reducerCustomManager
    });

  my.make = params => {
    my.config = {
      ...params
    };
    my.actions = generateactions(my.config.entityName, my.config.ApiUrl);
  };

  return my;
})(module);

export default APIRestMaker;
