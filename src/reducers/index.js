import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; //rename the confusing 'reducer' to more specific 'form'
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
