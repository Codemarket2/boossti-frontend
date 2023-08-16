import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import UnAuthorised from './UnAuthorised';
import NotFound from './NotFound';
import InitialLoading from './InitialLoading';

interface IProps {
  children: ReactNode;
  mustAdmin?: boolean;
}

export default function AuthRequired({ children, mustAdmin = false }: IProps) {
  const { initial, authenticated, admin } = useSelector(({ auth }: any) => auth);
  return (
    <>
      {initial ? (
        authenticated ? (
          mustAdmin && !admin ? (
            <NotFound />
          ) : (
            children
          )
        ) : (
          <UnAuthorised />
        )
      ) : (
        <InitialLoading />
      )}
    </>
  );
}
