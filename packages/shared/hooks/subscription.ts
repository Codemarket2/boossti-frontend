import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useSelector } from 'react-redux';

const NotificationMutation = gql`
  mutation Mymutation($userId: String!, $title: String!, $message: String!) {
    sendNotification(userId: $userId, title: $title, message: $message)
  }
`;

interface IProp {
  onAlert: (ar1: string, arg2: string) => void;
}

export function useSubscription({ onAlert = () => {} }: IProp) {
  const { sub, name } = useSelector(({ auth }: any) => auth.attributes);
  const [sendNotificationMutation] = useMutation(NotificationMutation);
  const [loading, setLoading] = useState(false);
  const handleSendNotification = async () => {
    try {
      setLoading(true);
      await sendNotificationMutation({
        variables: {
          userId: sub,
          title: `Hello ${name}`,
          message: 'Your subscription is confirmed',
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      onAlert('Error', error.message);
    }
  };
  return { handleSendNotification, loading };
}
