import { LOAD_LISTS, ADD_LIST, UPDATE_LIST, REMOVE_LIST } from '../actions/list';

const list = (state: any[] = [], action: any) => {
  switch (action.type) {
    case LOAD_LISTS: {
      return action.payload;
    }
    case ADD_LIST: {
      return [...state, action.payload];
    }
    case UPDATE_LIST: {
      return state.map((list) => (list._id === action.payload._id ? action.payload : list));
    }
    case REMOVE_LIST: {
      return state.filter((list) => list._id !== action._id);
    }
    default: {
      return state;
    }
  }
};

export default list;
