import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadcrumbsComponent from '../../common/Breadcrumbs';
import ErrorLoading from '../../common/ErrorLoading';
import NotFound from '../../common/NotFound';
import Form from '../Form';
import FormList from '../FormList';
import FormView from '../FormView';

export default function Feeds() {
  const [formSlug, setFormSlug] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query?.form) {
      setFormSlug(router.query?.form?.toString());
    }
  }, [router.query]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={3}>
        <FormList
          hideHeader
          customLink={(form) => `/feeds?form=${form?.slug}&tab=Responses`}
          selectedForm={formSlug}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        {formSlug ? (
          <>
            <DisplayForm formSlug={formSlug} />
          </>
        ) : (
          <Typography textAlign="center" variant="h4" className="mt-5">
            Select form from the list
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

const DisplayForm = ({ formSlug }: { formSlug: string }) => {
  const { data, error } = useGetFormBySlug(formSlug);
  const { admin } = useSelector((state: any) => state.auth);
  if (!data || error) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }
  if (admin) {
    return <Form form={data?.getFormBySlug} />;
  }
  if (!data?.getFormBySlug?.settings?.published) {
    return <NotFound />;
  }
  return (
    <div className="mt-3">
      <BreadcrumbsComponent>
        <Typography>Forms</Typography>
        <Typography>{data?.getFormBySlug?.name}</Typography>
      </BreadcrumbsComponent>
      <FormView form={data?.getFormBySlug} />
    </div>
  );
};
