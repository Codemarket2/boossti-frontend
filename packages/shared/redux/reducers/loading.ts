import { SHOW_LOADING, HIDE_LOADING, IAction } from '../actions/loading';

const authUser = (state: boolean = false, action: IAction): boolean => {
  switch (action.type) {
    case SHOW_LOADING: {
      return true;
    }
    case HIDE_LOADING: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default authUser;
