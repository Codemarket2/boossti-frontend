import { useMutation } from '@apollo/client';
import { IS_NOTIFICATION_CLICKED } from '../../graphql/mutation/notifications';

export function useIsNotificationClicked() {
  const [setIsClicked] = useMutation(IS_NOTIFICATION_CLICKED);
  const handleNotificationClicked = async (_id) => {
    try {
      const set = await setIsClicked({
        variables: {
          _id: _id,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  return {
    handleNotificationClicked,
  };
}
