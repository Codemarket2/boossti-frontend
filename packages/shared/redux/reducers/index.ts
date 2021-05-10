import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import auth from './auth';

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  auth,
});

export default rootReducer;
