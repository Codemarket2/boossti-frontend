export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const UNSET_AUTHED_USER = 'UNSET_AUTHED_USER';
export const INITIAL_AUTHED_USER = 'INITIAL_AUTHED_USER';

export function setAuthUser(user) {
  return {
    type: SET_AUTHED_USER,
    user
  };
}

export function unsetAuthUser() {
  return {
    type: UNSET_AUTHED_USER
  };
}
export function initialAuthUser() {
  return {
    type: INITIAL_AUTHED_USER
  };
}

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: UNSET_AUTHED_USER
  });
};
