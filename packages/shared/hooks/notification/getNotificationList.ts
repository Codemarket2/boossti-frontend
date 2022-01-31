import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_NOTIFICATION_LIST } from '../../graphql/query/notifications';

export const defaultQueryVariables = { page: 1, limit: 10, search: '' };

export function useGetNotificationList() {
  console.log('Calling UseGetNotificationList');
  const [pagenation, setPagenation] = useState({
    page: defaultQueryVariables.page,
    limit: defaultQueryVariables.limit,
    search: '',
    showSearch: false,
  });

  const { data, error, loading } = useQuery(GET_NOTIFICATION_LIST, {
    variables: { ...pagenation },
    fetchPolicy: 'cache-and-network',
  });
  const notificationList = data?.getNotificationList;
  console.log('Calling notificationList', notificationList);

  return { notificationList, error, loading, pagenation, setPagenation };
}
