import loading from '../loading';
import { SHOW_LOADING, HIDE_LOADING } from '../../actions/loading';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(loading(undefined, {})).toEqual(false);
  });

  it('should handle SHOW_LOADING', () => {
    expect(
      loading(false, {
        type: SHOW_LOADING,
      }),
    ).toEqual(true);
  });

  it('should handle HIDE_LOADING', () => {
    expect(
      loading(true, {
        type: HIDE_LOADING,
      }),
    ).toEqual(false);
  });
});
