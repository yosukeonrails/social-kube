import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  userInfoReducer,
  searchReducer,
});
