import { AnyAction } from 'redux';

import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
  USER_SUBSCRIPTION_DATA,
  IUserPayload,
} from '../actions/auth';

interface IAuthState extends IUserPayload {
  authenticated: boolean;
  initial: boolean;
  user?: any;
}

export const initialState: IAuthState = {
  user: null,
  authenticated: false,
  initial: false,
  admin: false,
  attributes: { sub: '', name: '', email: '', picture: '' },
};

const authUser = (state: IAuthState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_AUTHED_USER: {
      return {
        ...state,
        authenticated: true,
        initial: true,
        ...action.user,
      };
    }
    case UNSET_AUTHED_USER: {
      return { ...initialState, initial: true };
    }
    case INITIAL_AUTHED_USER: {
      return { ...state, initial: true };
    }
    case USER_SUBSCRIPTION_DATA: {
      return { ...state, user: action.user };
    }
    default: {
      return state;
    }
  }
};

export default authUser;
