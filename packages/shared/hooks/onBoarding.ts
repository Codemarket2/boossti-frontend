/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

interface IState {
  step: number;
  role: string | null;
}

export const useOnBoarding = () => {
  const [state, setState] = useState<IState>({ step: 1, role: null });

  const handleSelectRole = (role: string) => {
    setState({ ...state, role, step: 2 });
  };

  const handleContinue = (step: number) => {
    setState({ ...state, step });
  };

  return { state, handleSelectRole, handleContinue };
};
