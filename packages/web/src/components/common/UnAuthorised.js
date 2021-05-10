import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const UnAuthorised = () => {
  return (
    <div className="mt-3 py-5">
      <h2 className="text-center">Please Login to access this page!</h2>
      <div className="d-flex justify-content-center errorPageContentWrap">
        <Link href="/">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorised;
