// New Store with next-redux-wrapper
import { createStore, Store } from 'redux';
import { HYDRATE, createWrapper, Context } from 'next-redux-wrapper';
import reducers from '@frontend/shared/redux/reducers';
import middleware from '@frontend/shared/redux/middleware';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // preserve count value on client side navigation
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = (context: Context) => {
  return createStore(reducer, middleware);
};

export const wrapper = createWrapper<Store>(initStore);
