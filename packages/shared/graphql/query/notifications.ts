import { gql } from '@apollo/client';

export const GET_MY_NOTIFICATIONS = gql`
  query MyQuery($formId: ID!) {
    getMyNotifications(formId: $formId) {
      count
      data {
        _id
        userId
        title
        description
        link
        formId
        parentId
        isClicked
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
        parentId
        isClicked
      }
      _id
      notificationCount
    }
  }
`;
