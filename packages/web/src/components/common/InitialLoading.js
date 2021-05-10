import React from 'react';
import { Spinner } from 'react-bootstrap';

const InitialLoading = (props) => {
  return (
    <div className="text-center pt-5">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default InitialLoading;
