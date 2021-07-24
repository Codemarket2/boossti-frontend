import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function LoadingBar() {
  const loading = useSelector(({ loading }: any) => loading);
  if (loading) {
    return <LinearProgress className="w-100 position-absolute" />;
  } else {
    return null;
  }
}
