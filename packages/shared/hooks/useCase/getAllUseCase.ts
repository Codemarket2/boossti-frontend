/* eslint-disable import/prefer-default-export */
// import { useState } from 'react';
import {
  useSelector,
  //  useDispatch
} from 'react-redux';
import { IUseCase } from '../../redux/actions/useCase';

export function useGetAllUseCases() {
  const useCases = useSelector((state: { useCase: Array<IUseCase> }) => state.useCase);

  //   const [data, setData] = useState({
  //     count: 0,
  //     data: [
  //       { _id: '1', title: 'Login page', description: '' },
  //       { _id: '2', title: 'Add offering', description: '' },
  //       { _id: '3', title: 'Add Company(startup)', description: '' }
  //     ]
  //   });

  return { useCases };
}
