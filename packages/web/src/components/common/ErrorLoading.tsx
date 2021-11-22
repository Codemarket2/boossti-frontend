import { ReactNode } from 'react';
import InitialLoading from './InitialLoading';
import ShowError from './ShowError';

interface IProps {
  loading?: boolean;
  error?: any;
  children?: ReactNode;
}

export default function ErrorLoading({ error = null, loading = true, children }: IProps) {
  if (error) {
    return <ShowError error={error} />;
  }
  if (children) {
    return <>{children}</>;
  }
  return <InitialLoading />;
}
