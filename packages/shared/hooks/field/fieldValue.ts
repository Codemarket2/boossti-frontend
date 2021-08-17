import { useQuery, useMutation } from '@apollo/client';
import { GET_FIELD_VALUES_BY_FIELD } from '../../graphql/query/field';

const defaultQueryVariables = { limit: 1000, page: 1 };

export function useGetFieldValuesByField({ field }: any) {
  console.log('field', field);
  const { data, error, loading } = useQuery(GET_FIELD_VALUES_BY_FIELD, {
    variables: { ...defaultQueryVariables, field },
    fetchPolicy: 'cache-and-network',
  });
  console.log('data, error, loading', data, error, loading);
  return { data, error, loading };
}
