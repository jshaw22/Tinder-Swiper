import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; //rename the confusing 'reducer' to more specific 'form'
import authReducer from './auth_reducer'

const rootReducer = combineReducers({
  form: form,
  auth: authReducer
});

export default rootReducer;
