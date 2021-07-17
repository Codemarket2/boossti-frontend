export const LOAD_LISTS = 'LOAD_LISTS';
export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';

// export interface IAction {
//   type: string;
// }

export function loadListsAction(payload: any[]) {
  return {
    type: LOAD_LISTS,
    payload,
  };
}

export function addListAction(payload) {
  return {
    type: ADD_LIST,
    payload,
  };
}
export function updateListAction(payload) {
  return {
    type: UPDATE_LIST,
    payload,
  };
}

export function removeListAction(_id) {
  return {
    type: REMOVE_LIST,
    _id,
  };
}
