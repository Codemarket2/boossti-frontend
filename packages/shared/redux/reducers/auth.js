import { SET_AUTHED_USER, UNSET_AUTHED_USER, INITIAL_AUTHED_USER } from '../actions/auth';

const initialState = {
  authenticated: false,
  initial: false,
  admin: false,
  data: { admin: false, attributes: { sub: 'null' } }
};

const authUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHED_USER: {
      return {
        ...state,
        authenticated: true,
        data: action.user,
        initial: true
      };
    }
    case UNSET_AUTHED_USER: {
      return { ...initialState, initial: true };
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
