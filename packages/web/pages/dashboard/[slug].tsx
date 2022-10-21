import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import AppLayout from '../../src/components/app/AppLayout';
import { DisplayForm } from '../../src/components/form2/DisplayForm';
import ResponseScreen from '../../src/screens/ResponseScreen';
import NotFound from '../../src/components/common/NotFound';
import { DisplayFormDashboardBySlug } from '../../src/components/form2/FormDashboard';
import ErrorLoading from '../../src/components/common/ErrorLoading';

export default function index() {
  const router = useRouter();
  const { slug, id } = router.query;
  const { setting } = useSelector((state: any) => state);
  const appForm = setting?.appMenuItems?.find((item) => item?.formSlug === slug);
  const authorized = useAuthorization([setting?.appResponse?.createdBy?._id], true);

  return (
    <AppLayout>
      {!appForm?.formSlug ? (
        setting?.menuItems?.length > 0 ? (
          <NotFound />
        ) : (
          <ErrorLoading />
        )
      ) : (
        <>
          <Breadcrumbs className="pt-2" aria-label="breadcrumb" separator=">">
            <Home />
            {appForm?.label && (
              <Typography color="text.primary">
                <Link href={`/dashboard/${slug}`}>{appForm?.label}</Link>
              </Typography>
            )}
            {id && <Typography color="text.primary">{id}</Typography>}
          </Breadcrumbs>
          {id ? (
            <ResponseScreen
              hideBreadcrumbs
              slug={slug?.toString()}
              count={id?.toString()}
              deleteCallback={(form) => router.push(`/dashboard/${slug}`)}
            />
          ) : authorized ? (
            <DisplayFormDashboardBySlug
              slug={slug?.toString()}
              responseListProps={{
                onClickResponse: (response) => {
                  router.push(`${slug}?id=${response?.count}`);
                },
              }}
            />
          ) : (
            <DisplayForm
              slug={slug?.toString()}
              settings={{ formView: 'button' }}
              onClickResponse={(response) => {
                router.push(`${slug}?id=${response?.count}`);
              }}
            />
          )}
        </>
      )}
    </AppLayout>
  );
}
