import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { systemForms } from '@frontend/shared/utils/systemForms';
import React from 'react';
import Feed from './Feed';

export default function FeedWrapper() {
  const { data, error } = useGetFormBySlug(systemForms?.feed?.slug);

  if (!data || error) {
    return null;
  }

  return <Feed feedForm={data?.getFormBySlug} />;
}
