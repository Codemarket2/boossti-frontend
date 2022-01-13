import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_MY_NOTIFICATIONS } from '../../graphql/query/notifications';

export const defaultQueryVariables = { page: 1, limit: 10, search: '' };

export function useGetMyNotifications() {
  const [pagenation, setPagenation] = useState({
    page: defaultQueryVariables.page,
    limit: defaultQueryVariables.limit,
    search: '',
    showSearch: false,
  });

  const { data, error, loading } = useQuery(GET_MY_NOTIFICATIONS, {
    variables: { ...pagenation },
    fetchPolicy: 'cache-and-network',
  });
  const notifications = data?.getMyNotifications?.data;

  return { notifications, error, loading, pagenation, setPagenation };
}
