import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const InitialLoading = () => {
  return (
    <div className="text-center py-5 my-5">
      <CircularProgress />
    </div>
  );
};

export default InitialLoading;
