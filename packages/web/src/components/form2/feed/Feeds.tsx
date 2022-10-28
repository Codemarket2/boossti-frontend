import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Paper, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
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
  // const [formSlug, setFormSlug] = useState('');
  // const [selectedTab, setSelectedTab] = useState('forms');
  // const [leftMenuOpen, setLeftMenuOpen] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   if (router.query?.form) {
  //     setFormSlug(router.query?.form?.toString());
  //     setSelectedTab(
  //       router.query?.form?.toString() === 'work-flow-diagram' ? 'workflows' : 'forms',
  //     );
  //   } else {
  //     setFormSlug('');
  //     setSelectedTab('forms');
  //   }
  // }, [router.query?.form]);

  return router.query?.form ? (
    <>
      <DisplayForm formSlug={router.query?.form?.toString()} />
    </>
  ) : (
    <Typography textAlign="center" variant="h4" className="mt-5">
      Select form from the list
    </Typography>
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
