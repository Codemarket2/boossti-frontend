import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../src/components/app/AppLayout';
import DisplayResponseById from '../../src/components/response/DisplayResponseById';

export default function index() {
  const router = useRouter();
  // const { slug, responseCount } = router.query;
  const setting = useSelector((state: any) => state?.setting);
  // const appForm = setting?.appMenuItems?.find((item) => item?.formSlug === slug);

  return (
    <AppLayout isAdmin>
      <Breadcrumbs className="pt-2" aria-label="breadcrumb" separator=">">
        <Home />
        <Typography color="text.primary">App Settings</Typography>
      </Breadcrumbs>
      <DisplayResponseById hideNavigation responseId={setting?.appResponse?._id} />
    </AppLayout>
  );
}
