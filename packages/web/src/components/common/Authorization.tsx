import { useAuthorization } from '@frontend/shared/hooks/auth';
import { ReactNode } from 'react';
import NotFound from './NotFound';

interface IProps {
  children: ReactNode;
  _id: string[];
  allowAdmin?: boolean;
  returnNull?: boolean;
}

export default function Authorization({
  children,
  _id = [],
  allowAdmin = false,
  returnNull,
}: IProps) {
  const authorized = useAuthorization(_id, allowAdmin);

  if (authorized) {
    return <>{children}</>;
  }

  if (returnNull) {
    return null;
  }
  return <NotFound />;
}
