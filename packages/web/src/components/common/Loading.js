import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = (props) => (
  <div className="text-center pt-3">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loading;
