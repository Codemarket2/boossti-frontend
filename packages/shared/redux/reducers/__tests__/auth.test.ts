import auth, { initialState } from '../auth';
import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
  TOGGLE_DARK_MODE,
} from '../../actions/auth';

const tempUser = {
  attributes: {
    sub: 'dummy-sub',
    name: 'Dummy Name',
    email: 'dummy@gmail.com',
    picture: 'dummy.png',
  },
  admin: true,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should handle SET_AUTHED_USER', () => {
    expect(
      auth(initialState, {
        type: SET_AUTHED_USER,
        user: tempUser,
      }),
    ).toEqual({
      ...initialState,
      ...tempUser,
      authenticated: true,
      initial: true,
    });
  });

  it('should handle UNSET_AUTHED_USER', () => {
    expect(
      auth(initialState, {
        type: UNSET_AUTHED_USER,
      }),
    ).toEqual({
      ...initialState,
      initial: true,
    });
  });

  it('should handle INITIAL_AUTHED_USER', () => {
    expect(
      auth(initialState, {
        type: INITIAL_AUTHED_USER,
      }),
    ).toEqual({
      ...initialState,
      initial: true,
    });
  });

  it('should handle TOGGLE_DARK_MODE', () => {
    expect(
      auth(initialState, {
        type: TOGGLE_DARK_MODE,
      }),
    ).toEqual({
      ...initialState,
      darkMode: true,
    });
  });
});
