import { useQuery } from '@apollo/client';
import { GET_MENU_TEMPLATES } from '../../graphql/query/template';

export const useMenuTemplates = () => {
  const { data, error, loading } = useQuery(GET_MENU_TEMPLATES, {
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};
