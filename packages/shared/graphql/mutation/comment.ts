import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation MyMutation($parentId: ID!, $body: String!) {
    createComment(body: $body, parentId: $parentId) {
      _id
      body
      createdAt
      parentId
      updatedAt
    }
  }
`;

// export const UPDATE_COMMENT;

// export const DELETE_COMMENT;
