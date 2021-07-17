import { AnyAction } from 'redux';

import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
  USER_SUBSCRIPTION_DATA,
  IUserPayload,
  TOGGLE_DARK_MODE,
  TOGGLE_AUTH_LOADING,
} from '../actions/auth';

interface IAuthState extends IUserPayload {
  authenticated: boolean;
  initial: boolean;
  user?: any;
  darkMode: boolean;
  authLoading: boolean;
}

export const initialState: IAuthState = {
  user: null,
  authenticated: false,
  initial: false,
  admin: false,
  attributes: { sub: '', name: '', email: '', picture: '' },
  darkMode: false,
  authLoading: false,
};

const authUser = (state: IAuthState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_AUTHED_USER: {
      return {
        ...state,
        ...action.user,
        authenticated: true,
        initial: true,
        authLoading: false,
      };
    }
    case UNSET_AUTHED_USER: {
      return { ...initialState, initial: true, darkMode: state.darkMode };
    }
    case INITIAL_AUTHED_USER: {
      return { ...state, initial: true, authLoading: false };
    }
    case USER_SUBSCRIPTION_DATA: {
      return { ...state, user: action.user };
    }
    case TOGGLE_DARK_MODE: {
      return { ...state, darkMode: !state.darkMode };
    }
    case TOGGLE_AUTH_LOADING: {
      return { ...state, authLoading: action.authLoading };
    }
    default: {
      return state;
    }
  }
};

export default authUser;
