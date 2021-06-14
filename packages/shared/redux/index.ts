import { createStore, Store } from 'redux';
import { createWrapper, Context } from 'next-redux-wrapper';
import reducers from './reducers';
import middleware from './middleware';

// create a makeStore function
const makeStore = (context: Context) => createStore(reducers, middleware);

// export an assembled wrapper
export const wrapper = createWrapper<Store>(makeStore, { debug: false });

// import { createStore } from 'redux';

// import reducers from './reducers';
// import middleware from './middleware';

// export const store = createStore(reducers, middleware);
