import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { NOTIFICATION_SUB } from '../../graphql/subscription/notification';
import { client as apolloClient } from '../../graphql';
import { GET_NOTIFICATION_LIST } from '../../graphql/query/notifications';
import { defaultQueryVariables } from './getNotificationList';

export const updateNotificationCache = async (notification) => {
  const oldData = await apolloClient.readQuery({
    query: GET_NOTIFICATION_LIST,
    variables: { ...defaultQueryVariables, showSearch: false },
  });
  if (oldData?.getNotificationList) {
    const index = oldData.getNotificationList.findIndex((el) => el._id === notification._id);
    const newData = { ...oldData };
    if (index === -1) {
      newData.getNotificationList = [notification, ...oldData.getNotificationList];
    } else {
      newData.getNotificationList = oldData.getNotificationList.filter(
        (el) => el._id !== notification._id,
      );
      newData.getNotificationList.unshift({
        ...notification,
        notificationCount: oldData.getNotificationList[index].notificationCount + 1,
      });
    }
    await apolloClient.writeQuery({
      query: GET_NOTIFICATION_LIST,
      variables: { ...defaultQueryVariables, showSearch: false },
      data: newData,
    });
  }
};

export const useNotificationSub = () => {
  const [state, setState] = useState({
    showNotification: null,
    notifications: {},
    showSnack: false,
    title: 'New Notification',
    description: 'Sumi commented on your post',
    link: '',
  });
  const [audio] = useState(typeof Audio !== 'undefined' && new Audio('/notification.mp3'));
  const { attributes } = useSelector((reduxState: any) => reduxState?.auth);
  const { data, error } = useSubscription(NOTIFICATION_SUB, {
    variables: { userId: attributes['custom:_id'] },
  });
  const notificationPage = {
    __typename: 'NotificationPage',
    lastNotification: {},
    _id: '',
    notificationCount: 1,
  };

  useEffect(() => {
    if (data?.notificationSub) {
      audio.play();
      let temp = [];
      if (state.notifications[data.notificationSub.formId]) {
        temp = [data.notificationSub, ...state.notifications[data.notificationSub.formId]];
      } else {
        temp = [data.notificationSub];
      }
      notificationPage.lastNotification = data.notificationSub;
      notificationPage._id = data.notificationSub.threadId;
      updateNotificationCache(notificationPage);
      setState({
        ...state,
        notifications: { ...state.notifications, [data.notificationSub.formId]: temp },
        showSnack: true,
        title: data?.notificationSub?.title,
        description: data?.notificationSub?.description,
        link: data?.notificationSub?.link,
      });
    }
  }, [data]);

  return { state, setState };
};
