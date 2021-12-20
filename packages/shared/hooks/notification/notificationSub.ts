import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { NOTIFICATION_SUB } from '../../graphql/subscription/notification';

export const useNotificationSub = () => {
  const [state, setState] = useState({
    showNotification: null,
    notifications: [],
    showSnack: false,
    title: 'New Notification',
    description: 'Sumi commented on your post',
    link: '',
  });

  const { attributes } = useSelector((reduxState: any) => reduxState?.auth);
  const { data, error } = useSubscription(NOTIFICATION_SUB, {
    variables: { userId: attributes['custom:_id'] },
  });
  // 60fc4d29f11b170008d9ec48

  //   console.log('NOTIFICATION_SUB data, error ', data, error);

  useEffect(() => {
    if (data?.notificationSub) {
      console.log(data?.notificationSub);
      setState({
        ...state,
        notifications: [...state.notifications, data.notificationSub],
        showSnack: true,
        title: data?.notificationSub?.title,
        description: data?.notificationSub?.description,
        link: data?.notificationSub?.link,
      });
    }
  }, [data]);

  return { state, setState };
};
