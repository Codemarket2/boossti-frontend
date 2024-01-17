export const HIDE_LOADING = 'HIDE_LOADING';
export const SHOW_LOADING = 'SHOW_LOADING';

export interface IAction {
  type: string;
}

export function hideLoading(): IAction {
  return {
    type: HIDE_LOADING,
  };
}

export function showLoading(): IAction {
  return {
    type: SHOW_LOADING,
  };
}
