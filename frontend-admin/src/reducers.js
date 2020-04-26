import { combineReducers } from 'redux';
import { userReducer } from './containers/Users/data/models';

const rootReducer = combineReducers({
  users: userReducer
});

export default rootReducer;
