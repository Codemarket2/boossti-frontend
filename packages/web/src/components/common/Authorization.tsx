import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import NotFound from './NotFound';

interface IProps {
  children: ReactNode;
  _id: string;
  allowAdmin?: boolean;
}

export default function Authorization({ children, _id, allowAdmin = false }: IProps) {
  const { attributes, admin = false } = useSelector(({ auth }: any) => auth);
  if (attributes['custom:_id'] === _id || (allowAdmin && admin)) {
    return <>{children}</>;
  }
  return <NotFound />;
}
