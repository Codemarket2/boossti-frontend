import { gql } from '@apollo/client';

export const CREATE_LIKE = gql`
  mutation MyMutation($parentId: ID!) {
    createLike(parentId: $parentId) {
      _id
      createdAt
      like
      parentId
      createdBy {
        name
        picture
      }
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation MyMutation($_id: ID!) {
    deleteLike(_id: $_id)
  }
`;
