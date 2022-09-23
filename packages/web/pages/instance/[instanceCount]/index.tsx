import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import AppLayout from '../../../src/components/app/AppLayout';

export default function index() {
  const router = useRouter();
  const { instanceCount } = router.query;

  return (
    <AppLayout isInstance>
      <Breadcrumbs className="pt-2" aria-label="breadcrumb" separator=">">
        <Home />
        <Typography color="text.primary">{instanceCount}</Typography>
      </Breadcrumbs>
      App Instance Dashboard
    </AppLayout>
  );
}
