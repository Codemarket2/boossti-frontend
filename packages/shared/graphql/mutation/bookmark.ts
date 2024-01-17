import { gql } from '@apollo/client';

export const CREATE_BOOKMARK = gql`
  mutation MyMutation($parentId: String, $bookmark: String!) {
    createBookmark(parentId: $parentId, bookmark: $bookmark) {
      _id
      parentId
      bookmark
      createdAt
    }
  }
`;

export const DELETE_BOOKMARK = gql`
  mutation MyMutation($_id: ID!) {
    deleteBookmark(_id: $_id)
  }
`;
