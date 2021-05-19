import { createStore } from 'redux';

import reducers from './reducers';
import middleware from './middleware';

export const store = createStore(reducers, middleware);
