import { gql } from '@apollo/client';

export const ADDED_LIKE = gql`
  subscription MySubscription($parentId: ID!) {
    addedLike(parentId: $parentId) {
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
