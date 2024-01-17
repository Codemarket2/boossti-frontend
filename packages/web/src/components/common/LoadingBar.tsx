import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingBar() {
  const loading = useSelector((state: any) => state?.loading);
  if (loading) {
    return <LinearProgress className="w-100 position-absolute" />;
  }
  return null;
}
