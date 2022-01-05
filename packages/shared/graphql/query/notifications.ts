import { gql } from '@apollo/client';

export const GET_MY_NOTIFICATIONS = gql`
  query MyQuery {
    getMyNotifications {
      count
      data {
        userId
        title
        description
        link
      }
    }
  }
`;
