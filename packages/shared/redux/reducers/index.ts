import { combineReducers } from 'redux';
import loading from './loading';
import auth from './auth';
import list from './list';

const rootReducer = combineReducers({
  auth,
  loading,
  list,
});

export default rootReducer;
