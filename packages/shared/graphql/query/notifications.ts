import { gql } from '@apollo/client';

export const GET_MY_NOTIFICATIONS = gql`
  query MyQuery($threadId: ID!) {
    getMyNotifications(threadId: $threadId) {
      count
      data {
        _id
        userId {
          picture
          userId
          name
        }
        title
        description
        link
        formId
        threadId
        parentId
        isClicked
        createdAt
      }
    }
  }
`;

export const GET_NOTIFICATION_LIST = gql`
  query MyQuery {
    getNotificationList {
      lastNotification {
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
      _id
      notificationCount
    }
  }
`;
