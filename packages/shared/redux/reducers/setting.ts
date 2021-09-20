import { AnyAction } from 'redux';

import { UPDATE_SETTING, IAttributes } from '../actions/setting';

export const initialState: IAttributes = {
  bottomDrawer: false,
};

const setting = (state: IAttributes = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_SETTING: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default setting;
