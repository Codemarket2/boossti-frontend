import { showLoading, hideLoading, SHOW_LOADING, HIDE_LOADING } from '../loading';

describe('actions', () => {
  it('Redux Loading Actions', () => {
    const expectedShowLoadingAction = {
      type: SHOW_LOADING,
    };
    const expectedHideLoadingAction = {
      type: HIDE_LOADING,
    };
    expect(showLoading()).toEqual(expectedShowLoadingAction);
    expect(hideLoading()).toEqual(expectedHideLoadingAction);
  });
});
