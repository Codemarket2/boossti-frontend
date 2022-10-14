import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { IForm } from '@frontend/shared/types';
import React from 'react';
import { useSelector } from 'react-redux';
// import BreadcrumbsComponent from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import Form from './Form';
import FormView from './FormView';

interface FormDashboard {
  form: IForm;
}

export default function FormDashboard({ form }: FormDashboard) {
  return (
    <div>
      <Form form={form} />
    </div>
  );
}

export const DisplayFormDashboardBySlug = ({ slug }: { slug: string }) => {
  const { data, error } = useGetFormBySlug(slug);
  const { admin } = useSelector((state: any) => state.auth);
  if (!data || error) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  if (admin) {
    return <Form drawerMode form={data?.getFormBySlug} />;
  }

  if (!data?.getFormBySlug?.settings?.published) {
    return <NotFound />;
  }
  return <FormView form={data?.getFormBySlug} />;
};
