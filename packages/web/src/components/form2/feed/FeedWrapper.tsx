import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { systemForms } from '@frontend/shared/utils/systemForms';
import React from 'react';
import ErrorLoading from '../../common/ErrorLoading';
import Feed from './Feed';

export default function FeedWrapper({ showList }: { showList: boolean }) {
  const { data, error } = useGetFormBySlug(systemForms?.feed?.slug);

  if (!data || error) {
    return <ErrorLoading error={error} />;
  }

  return <Feed feedForm={data?.getFormBySlug} showList={showList} />;
}
