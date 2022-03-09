import { useMutation } from '@apollo/client';
import { IS_NOTIFICATION_CLICKED } from '../../graphql/mutation/notifications';
import { GET_NOTIFICATION_LIST } from '../../graphql/query/notifications';
import { client as apolloClient } from '../../graphql';
import { defaultQueryVariables } from './getNotificationList';

const updateNotificationCache = async (id, threadId) => {
  const oldList = await apolloClient.readQuery({
    query: GET_NOTIFICATION_LIST,
    variables: { ...defaultQueryVariables, showSearch: false },
  });
  if (oldList?.getNotificationList) {
    const newStack = [];
    for (let i = 0; i < oldList.getNotificationList?.length; i += 1) {
      const item = oldList.getNotificationList[i];
      if (item._id === threadId) {
        if (item.notificationCount > 1)
          newStack.push({ ...item, notificationCount: item.notificationCount - 1 });
      } else newStack.push(item);
    }
    const newNotificationList = {
      getNotificationList: newStack,
    };
    await apolloClient.writeQuery({
      query: GET_NOTIFICATION_LIST,
      variables: { ...defaultQueryVariables, showSearch: false },
      data: newNotificationList,
    });
  }
};

export function useIsNotificationClicked() {
  const [setIsClicked] = useMutation(IS_NOTIFICATION_CLICKED);
  const handleNotificationClicked = async (_id, threadId) => {
    try {
      const set = await setIsClicked({
        variables: {
          _id,
        },
      });
      updateNotificationCache(_id, threadId);
    } catch (error) {
      console.error(error.message);
    }
  };
  return {
    handleNotificationClicked,
  };
}
