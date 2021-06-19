import { applyMiddleware } from 'redux';
// // import LogRocket from "logrocket";
import logger from './logger';

export default applyMiddleware(logger); //, LogRocket.reduxMiddleware()
