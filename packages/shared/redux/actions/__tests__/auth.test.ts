import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
  TOGGLE_DARK_MODE,
  setAuthUser,
  unsetAuthUser,
  initialAuthUser,
  toggleDarkMode,
} from '../auth';

const tempUser = {
  attributes: {
    sub: 'dummy-sub',
    name: 'Dummy Name',
    email: 'dummy@gmail.com',
    picture: 'dummy.png',
  },
  admin: true,
};

describe('actions', () => {
  it('Redux Auth Actions', () => {
    const expectedSetAuthUserAction = {
      type: SET_AUTHED_USER,
      user: tempUser,
    };
    const expectedUnSetAuthUserAction = {
      type: UNSET_AUTHED_USER,
    };
    const expectedInitialAuthUserAction = {
      type: INITIAL_AUTHED_USER,
    };
    const expectedToggleDarkModeAction = {
      type: TOGGLE_DARK_MODE,
    };
    expect(setAuthUser(tempUser)).toEqual(expectedSetAuthUserAction);
    expect(unsetAuthUser()).toEqual(expectedUnSetAuthUserAction);
    expect(initialAuthUser()).toEqual(expectedInitialAuthUserAction);
    expect(toggleDarkMode()).toEqual(expectedToggleDarkModeAction);
  });
});
