import { useQuery } from '@apollo/client';
import { GET_ALL_EMAILS } from '../../graphql/query/email';

export const useGetAllEmails = () => {
  const { data, loading, error } = useQuery(GET_ALL_EMAILS, {
    fetchPolicy: 'cache-and-network',
  });
  return { data, loading, error };
};
