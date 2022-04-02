import { store } from '@frontend/shared/redux';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function Wrapper({ children }: ReactNode) {
  return <Provider store={store}>{children}</Provider>;
}
