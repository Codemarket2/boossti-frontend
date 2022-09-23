import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../src/components/app/AppLayout';
import { DisplayForm } from '../../src/components/form2/DisplayForm';
import ResponseScreen from '../../src/screens/ResponseScreen';
import NotFound from '../../src/components/common/NotFound';

export default function index() {
  const router = useRouter();
  const { slug, responseCount } = router.query;
  const setting = useSelector((state: any) => state?.setting);
  const appForm = setting?.appMenuItems?.find((item) => item?.formSlug === slug);

  return (
    <AppLayout>
      {!appForm?.formSlug ? (
        <NotFound />
      ) : (
        <>
          <Breadcrumbs className="pt-2" aria-label="breadcrumb" separator=">">
            <Home />
            {appForm?.label && (
              <Typography color="text.primary">
                <Link href={`/${slug}`}>{appForm?.label}</Link>
              </Typography>
            )}
            {responseCount && <Typography color="text.primary">{responseCount}</Typography>}
          </Breadcrumbs>
          {responseCount ? (
            <ResponseScreen
              hideBreadcrumbs
              slug={slug?.toString()}
              count={responseCount?.toString()}
            />
          ) : (
            <DisplayForm
              slug={slug?.toString()}
              settings={{ formView: 'button' }}
              onClickResponse={(response, form) => {
                router.push(`${slug}?responseCount=${response?.count}`);
              }}
            />
          )}
        </>
      )}
    </AppLayout>
  );
}
