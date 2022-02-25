import { useAuthorization } from '@frontend/shared/hooks/auth';
import { ReactNode } from 'react';
import NotFound from './NotFound';

interface IProps {
  children: ReactNode;
  _id: string[];
  allowAdmin?: boolean;
  ViewAuth?: boolean;
  returnNull?: boolean;
}

export default function Authorization({
  children,
  _id = [],
  allowAdmin = false,
  ViewAuth = true,
  returnNull,
}: IProps) {
  const authorized = useAuthorization(_id, allowAdmin);

  if (authorized || !ViewAuth) {
    return <>{children}</>;
  }

  if (returnNull) {
    return null;
  }
  return <NotFound />;
}
