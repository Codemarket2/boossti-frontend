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
