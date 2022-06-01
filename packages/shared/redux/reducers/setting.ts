import { AnyAction } from 'redux';
import { UPDATE_SETTING, IAttributes, UPDATE_THEME, SET_DEFAULT_THEME } from '../actions/setting';

export const initialState: IAttributes = {
  bottomDrawer: false,
  metaTags: {
    image: '',
    description: '',
    title: '',
  },
  editMode: false,
  theme: {},
  userForm: {},
};

const setting = (state: IAttributes = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_SETTING: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_THEME: {
      return {
        ...state,
        theme: {
          // ...state.theme,
          ...action.theme,
        },
      };
    }
    case SET_DEFAULT_THEME: {
      return {
        ...state,
        theme: action.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default setting;
