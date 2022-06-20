import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Form from '../Form';
import FormList from '../FormList';

export default function Feeds() {
  const [state, setState] = useState({ form: null });
  const router = useRouter();

  useEffect(() => {
    if (router.query?.form && router.query?._id) {
      setState({ ...state, form: { slug: router.query?.form, _id: router.query?._id } });
    }
  }, [router.query]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={3}>
        <FormList
          hideHeader
          customLink={(form) => `/feeds?form=${form?.slug}&_id=${form?._id}&tab=Activity`}
          selectedForm={state.form?.slug}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        {state.form?._id ? (
          <>
            <Form _id={state.form?._id} hideFields />
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
