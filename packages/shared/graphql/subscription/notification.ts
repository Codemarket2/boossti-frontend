import { gql } from '@apollo/client';

export const NOTIFICATION_SUB = gql`
  subscription MySubscription($userId: ID!) {
    notificationSub(userId: $userId) {
      userId
      title
      description
      link
    }
  }
`;
