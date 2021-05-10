import {
  GET_ALL_USECASE,
  ADD_USECASE,
  UPDATE_USECASE,
  DELETE_USECASE,
  IUseCase,
} from '../actions/useCase';

interface IAction {
  type: string;
  payload: any;
}

const initialState: Array<IUseCase> = [
  { _id: '1', title: 'UseCase 1', description: '<p>Login Usecase</p>' },
  { _id: '2', title: 'UseCase 2', description: '<p>offering Usecase</p>' },
  { _id: '3', title: 'UseCase 3', description: '<p>Company(startup) Usecase</p>' },
  { _id: '4', title: 'UseCase 4', description: '<p>Listing Usecase</p>' },
  { _id: '5', title: 'UseCase 5', description: '<p>Booking Usecase</p>' },
];

const useCase = (state: Array<IUseCase> = initialState, action: IAction) => {
  switch (action.type) {
    case GET_ALL_USECASE: {
      return action.payload;
    }
    case ADD_USECASE: {
      return [...state, action.payload];
    }
    case UPDATE_USECASE: {
      return state.map((s) => (s._id === action.payload._id ? action.payload : s));
    }
    case DELETE_USECASE: {
      return state.filter((s) => s._id !== action.payload._id);
    }
    default: {
      return state;
    }
  }
};

export default useCase;
