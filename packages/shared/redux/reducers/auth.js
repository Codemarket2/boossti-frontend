import { HYDRATE } from 'next-redux-wrapper';

import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
  USER_SUBSCRIPTION_DATA,
} from '../actions/auth';

const initialState = {
  user: null,
  authenticated: false,
  initial: false,
  admin: false,
  data: { admin: false, attributes: { sub: 'null' } },
};

const authUser = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case SET_AUTHED_USER: {
      return {
        ...state,
        authenticated: true,
        data: action.user,
        initial: true,
      };
    }
    case UNSET_AUTHED_USER: {
      return { ...initialState, initial: true };
    }
    case USER_SUBSCRIPTION_DATA: {
      return { ...state, user: action.user };
    }
    case INITIAL_AUTHED_USER: {
      return { ...state, initial: true };
    }
    default: {
      return state;
    }
  }
};
export default authUser;
