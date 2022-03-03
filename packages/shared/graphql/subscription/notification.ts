import { gql } from '@apollo/client';

export const NOTIFICATION_SUB = gql`
  subscription MySubscription($userId: ID!) {
    notificationSub(userId: $userId) {
      _id
      userId
      title
      description
      link
      formId
      threadId
      parentId
      isClicked
    }
  }
`;
