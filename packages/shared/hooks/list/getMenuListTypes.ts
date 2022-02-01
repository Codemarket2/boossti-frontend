import { useQuery } from '@apollo/client';
import { GET_MENU_LIST_TYPES } from '../../graphql/query/list';

export const useMenuListTypes = () => {
  const { data, error, loading } = useQuery(GET_MENU_LIST_TYPES, {
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};
