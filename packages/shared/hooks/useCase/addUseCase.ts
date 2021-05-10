/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addUseCase, updateUseCase } from '../../redux/actions/useCase';

export interface IIinitialPayload {
  edit?: boolean;
  showModal?: boolean;
  _id: string;
  title: string;
  description: string;
}

const initialPayload: IIinitialPayload = {
  edit: false,
  showModal: false,
  _id: '',
  title: '',
  description: '',
};

export function useAddUseCase() {
  const [payload, setPayload] = useState<IIinitialPayload>(initialPayload);

  const dispatch = useDispatch();

  const onSave = () => {
    // Redux State Update
    if (payload.edit) {
      dispatch(updateUseCase(payload));
    } else {
      dispatch(
        addUseCase({
          ...payload,
          _id: uuid(),
        }),
      );
    }
    setPayload(initialPayload);
  };

  return { payload, setPayload, onSave };
}
