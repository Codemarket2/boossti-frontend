import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation MyMutation($threadId: ID!, $parentId: ID!, $body: String!) {
    createComment(body: $body, parentId: $parentId, threadId: $threadId) {
      _id
      body
      createdAt
      parentId
      updatedAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation MyMutation($_id: ID!, $body: String!) {
    updateComment(_id: $_id, body: $body) {
      _id
      body
      createdAt
      updatedAt
      createdBy {
        name
        picture
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation MyMutation($_id: ID!) {
    deleteComment(_id: $_id)
  }
`;
