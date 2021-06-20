import React from 'react';
import { useSelector } from 'react-redux';
import UnAuthorised from './UnAuthorised';
import NotFound from './NotFound';
import InitialLoading from './InitialLoading';

interface IProps {
  children: React.ReactNode;
  redirectPath?: string;
  mustAdmin?: boolean;
}

export default function AuthRequired({ children, mustAdmin = false, redirectPath }: IProps) {
  const { initial, authenticated, admin } = useSelector(({ auth }: any) => auth);
  return (
    <div>
      {initial ? (
        authenticated ? (
          mustAdmin ? (
            admin ? (
              children
            ) : (
              <NotFound />
            )
          ) : (
            children
          )
        ) : (
          <UnAuthorised redirectPath={redirectPath} />
        )
      ) : (
        <InitialLoading />
      )}
    </div>
  );
}
