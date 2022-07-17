import { gql } from '@apollo/client';

export const CREATE_LIKE = gql`
  mutation MyMutation($threadId: ID!) {
    createLike(threadId: $threadId) {
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

export const DELETE_LIKE = gql`
  mutation MyMutation($threadId: ID!) {
    deleteLike(threadId: $threadId)
  }
`;
