// Old
import { createStore } from 'redux';

import reducers from './reducers';
import middleware from './middleware';

export const store = createStore(reducers, middleware);

// New With next-redux-wrapper
// import { createStore } from 'redux';
// import { HYDRATE, createWrapper } from 'next-redux-wrapper';
// import reducers from './reducers';
// import middleware from './middleware';

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     // preserve count value on client side navigation
//     return nextState;
//   } else {
//     return reducers(state, action);
//   }
// };

// const initStore = () => {
//   return createStore(reducer, middleware);
// };

// export const wrapper = createWrapper(initStore);
