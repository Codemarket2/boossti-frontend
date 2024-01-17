import { gql } from '@apollo/client';

export const GET_LIKES_BY_PARENT_ID = gql`
  query MyQuery($threadId: ID!) {
    getLikesByThreadId(threadId: $threadId) {
      data {
        _id
        like
        threadId
        createdBy {
          _id
          count
          values {
            field
            value
          }
        }
        createdAt
      }
    }
  }
`;

export const GET_LIKE = gql`
  query MyQuery($_id: ID!) {
    getLike(_id: $_id) {
      _id
      like
      threadId
      createdBy {
        _id
        count
        values {
          field
          value
        }
      }
      createdAt
    }
  }
`;
