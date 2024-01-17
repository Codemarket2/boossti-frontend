import Drawer from '@mui/material/Drawer';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

export default function LoadingOverlay() {
  return (
    <Drawer open>
      <div style={{ width: '100vw' }}>
        <Skeleton height="30vh" />
        <Skeleton height="30vh" />
        <Skeleton height="30vh" />
      </div>
    </Drawer>
  );
}
