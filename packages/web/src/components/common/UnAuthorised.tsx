import React from 'react';
import Link from 'next/link';
import LoadingButton from './LoadingButton';

interface IProps {
  redirectPath?: string | undefined;
}

export default function UnAuthorised({ redirectPath }: IProps) {
  return (
    <div className="mt-3 py-5">
      <h2 className="text-center">Please Sign In to access this page!</h2>
      <div className="d-flex justify-content-center errorPageContentWrap">
        <Link href={`/auth${redirectPath ? `?r=${redirectPath}` : ''}`}>
          <LoadingButton>Sign In</LoadingButton>
        </Link>
      </div>
    </div>
  );
}
