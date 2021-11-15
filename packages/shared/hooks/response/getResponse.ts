import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_RESPONSE, GET_RESPONSES } from '../../graphql/query/response';

export const defaultQueryVariables = { page: 1, limit: 100, search: '' };

export function useGetResponses(formId: string): any {
  const [state, setState] = useState({
    page: defaultQueryVariables.page,
    limit: defaultQueryVariables.limit,
    search: '',
    showSearch: false,
  });

  const { data, error, loading } = useQuery(GET_RESPONSES, {
    variables: { ...state, formId },
    fetchPolicy: 'cache-and-network',
  });

  console.log('data, error, loading ', data, error, loading);

  return { data, error, loading, state, setState };
}

export function useGetResponse(_id: string): any {
  const { data, error, loading } = useQuery(GET_RESPONSE, {
    variables: { _id },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
}
