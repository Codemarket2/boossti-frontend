import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { IForm } from '@frontend/shared/types';
import React from 'react';
import { useSelector } from 'react-redux';
// import BreadcrumbsComponent from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import NotFound from '../common/NotFound';
import { IResponseList } from '../response/ResponseList';
import Form from './Form';
import FormView from './FormView';

interface FormDashboard {
  form: IForm;
  responseListProps?: Partial<IResponseList>;
}

export default function FormDashboard({ form, responseListProps }: FormDashboard) {
  return (
    <div>
      <Form form={form} responseListProps={responseListProps} />
    </div>
  );
}

export const DisplayFormDashboardBySlug = ({
  slug,
  responseListProps,
}: {
  slug: string;
  responseListProps?: Partial<IResponseList>;
}) => {
  console.log(slug, 'Slug Value');
  const { data, error } = useGetFormBySlug(slug);
  const { admin } = useSelector((state: any) => state.auth);
  if (!data || error) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getFormBySlug) {
    return <NotFound />;
  }

  if (admin) {
    return <Form drawerMode form={data?.getFormBySlug} responseListProps={responseListProps} />;
  }

  if (!data?.getFormBySlug?.settings?.published) {
    return <NotFound />;
  }
  return <FormView {...responseListProps} form={data?.getFormBySlug} />;
};
