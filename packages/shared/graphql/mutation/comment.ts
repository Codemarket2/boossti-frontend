import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation MyMutation($threadId: ID!, $parentIds: [ID], $body: String!, $path: String) {
    createComment(body: $body, parentIds: $parentIds, threadId: $threadId, path: $path) {
      _id
      body
      threadId
      parentIds
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

export const UPDATE_COMMENT = gql`
  mutation MyMutation($_id: ID!, $body: String!) {
    updateComment(_id: $_id, body: $body) {
      _id
      body
      threadId
      parentIds
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

export const DELETE_COMMENT = gql`
  mutation MyMutation($_id: ID!) {
    deleteComment(_id: $_id)
  }
`;
