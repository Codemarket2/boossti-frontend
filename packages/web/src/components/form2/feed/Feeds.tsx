import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ErrorLoading from '../../common/ErrorLoading';
import NotFound from '../../common/NotFound';
import Form from '../Form';
import FormList from '../FormList';

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
  if (!data || error) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  return <Form form={data?.getFormBySlug} />;
};
