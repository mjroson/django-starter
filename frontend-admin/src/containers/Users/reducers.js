import userModel from './actions';

const initialState = {
  count: 0,
  results: [],
  errors: {},
  loading: false,
  reqStatus: {}
};

const reducer = userModel.reducer(initialState);

export default reducer;
