import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { useGetResponses } from '@frontend/shared/hooks/response';
import { useGetTemplateBySlug } from '@frontend/shared/hooks/template';
import React from 'react';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  subdomain: string;
}

export default function AccountAdmin({ subdomain }: IProps) {
  const { data, error } = useGetTemplateBySlug({ slug: 'account' });
  const { data: formData, error: formError } = useGetFormBySlug('account');
  // const accountNameFieldId =
  const { data: responseData, error: responseError } = useGetResponses({
    formId: formData?.getFormBySlug?._id,
    search: subdomain,
    // formField:
  });

  if (error || !data || formError || !formData) {
    return <ErrorLoading error={error || formError || responseError} />;
  }

  return <div>AccountAdmin - {subdomain}</div>;
}

const getFieldIdByLabel = (fields: any[]) => {
  // const field = fields?.
};
