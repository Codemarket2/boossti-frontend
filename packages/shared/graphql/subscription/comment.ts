import { gql } from '@apollo/client';

export const ADDED_COMMENT = gql`
  subscription MySubscription($parentId: ID!) {
    addedComment(parentId: $parentId) {
      _id
      body
      createdAt
      parentId
      updatedAt
    }
  }
`;
