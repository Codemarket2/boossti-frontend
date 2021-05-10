export const GET_ALL_USECASE: string = 'GET_ALL_USECASE';
export const ADD_USECASE: string = 'ADD_USECASE';
export const UPDATE_USECASE: string = 'UPDATE_USECASE';
export const DELETE_USECASE: string = 'DELETE_USECASE';

export interface IUseCase {
  _id: string;
  title: string;
  description: string;
}

export function getAllUseCases(payload: Array<IUseCase>) {
  return {
    type: GET_ALL_USECASE,
    payload,
  };
}

export function addUseCase(payload: IUseCase) {
  return {
    type: ADD_USECASE,
    payload,
  };
}

export function updateUseCase(payload: IUseCase) {
  return {
    type: UPDATE_USECASE,
    payload,
  };
}

export function deleteUseCase() {
  return {
    type: DELETE_USECASE,
  };
}
