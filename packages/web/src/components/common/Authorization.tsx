import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import NotFound from './NotFound';

interface IProps {
  children: ReactNode;
  _id: string | string[];
  allowAdmin?: boolean;
}

export default function Authorization({ children, _id, allowAdmin = false }: IProps) {
  const { attributes, admin = false } = useSelector(({ auth }: any) => auth);

  let allow = false;
  if (typeof _id === 'string') {
    allow = attributes['custom:_id'] === _id;
  } else if (typeof _id === 'object') {
    allow = _id?.includes(attributes['custom:_id']);
  }

  if (allow || (allowAdmin && admin)) {
    return <>{children}</>;
  }
  return <NotFound />;
}
