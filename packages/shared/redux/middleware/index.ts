import { applyMiddleware } from 'redux';
import logger from './logger';

export default applyMiddleware(logger);
