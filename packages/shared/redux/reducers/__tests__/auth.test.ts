import auth, { initialState } from '../auth';
import { SET_AUTHED_USER, UNSET_AUTHED_USER, INITIAL_AUTHED_USER } from '../../actions/auth';

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
      user: null,
      authenticated: false,
      initial: false,
      admin: false,
      attributes: { sub: '', name: '', email: '', picture: '' },
    });
  });

  it('should handle SET_AUTHED_USER', () => {
    expect(
      auth(initialState, {
        type: SET_AUTHED_USER,
        user: tempUser,
      }),
    ).toEqual({
      ...tempUser,
      authenticated: true,
      initial: true,
      user: null,
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
});
