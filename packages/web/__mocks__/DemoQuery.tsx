import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_FORM_BY_SLUG } from '@frontend/shared/graphql/query/form';
import { GET_RESPONSES } from '@frontend/shared/graphql/query/response';
import { useGetResponses } from '@frontend/shared/hooks/response';

export const variables = {
  formId: '62f687f8af282a8147d7fd8c',
  workflowId: null,
  page: 1,
  limit: 10,
  search: '',
  formField: null,
  onlyMy: false,
  valueFilter: null,
};
const DemoQuery = () => {
  // const { data, error: queryError, loading, state, setState } = useGetResponses(variables);

  const { data, loading, error: queryError } = useQuery(GET_RESPONSES, {
    variables,
  });
  // console.log(JSON.stringify(data));
  if (loading) return <div>Loading...</div>;
  if (queryError) return <div>{queryError.message}</div>;
  if (!data) return <div>No data</div>;
  return <div data-testid="demoQuery">{data?.getResponses.data[0]._id}</div>;
};

export default DemoQuery;
