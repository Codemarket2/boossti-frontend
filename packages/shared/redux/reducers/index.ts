import { combineReducers } from 'redux';
import loading from './loading';
import auth from './auth';
import setting from './setting';

const rootReducer = combineReducers({
  auth,
  loading,
  setting,
});

export default rootReducer;
