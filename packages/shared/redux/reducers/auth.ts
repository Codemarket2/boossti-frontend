import { AnyAction } from 'redux';

import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
  USER_SUBSCRIPTION_DATA,
  IUserPayload,
  TOGGLE_DARK_MODE,
} from '../actions/auth';

interface IAuthState extends IUserPayload {
  authenticated: boolean;
  initial: boolean;
  user?: any;
  darkMode: boolean;
}

export const initialState: IAuthState = {
  user: null,
  authenticated: false,
  initial: false,
  admin: false,
  attributes: { sub: '', name: '', email: '', picture: '' },
  darkMode: false,
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
      return { ...initialState, initial: true, darkMode: state.darkMode };
    }
    case INITIAL_AUTHED_USER: {
      return { ...state, initial: true };
    }
    case USER_SUBSCRIPTION_DATA: {
      return { ...state, user: action.user };
    }
    case TOGGLE_DARK_MODE: {
      return { ...state, darkMode: !state.darkMode };
    }
    default: {
      return state;
    }
  }
};

export default authUser;
