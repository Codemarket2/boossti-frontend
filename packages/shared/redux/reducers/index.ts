import { combineReducers } from 'redux';
import loading from './loading';
import auth from './auth';
import list from './list';
import setting from './setting';

const rootReducer = combineReducers({
  auth,
  loading,
  list,
  setting,
});

export default rootReducer;
