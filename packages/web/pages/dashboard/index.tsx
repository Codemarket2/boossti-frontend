import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Home } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../src/components/app/AppLayout';
import DisplayResponseById from '../../src/components/response/DisplayResponseById';

export default function index() {
  const setting = useSelector((state: any) => state?.setting);

  return (
    <AppLayout>
      <Breadcrumbs className="pt-2" aria-label="breadcrumb" separator=">">
        <Home />
        <Typography color="text.primary">App Settings</Typography>
      </Breadcrumbs>
      <DisplayResponseById hideNavigation responseId={setting?.appResponse?._id} />
    </AppLayout>
  );
}
