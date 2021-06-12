import { combineReducers } from 'redux';
import loading from './loading';

import auth from './auth';

const rootReducer = combineReducers({
  auth,
  loading,
});

export default rootReducer;
