import React from 'react';
import { CircularProgress } from '@material-ui/core';

const InitialLoading = () => {
  return (
    <div className="text-center pt-5 mt-5">
      <CircularProgress />
    </div>
  );
};

export default InitialLoading;
