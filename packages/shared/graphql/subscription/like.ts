import { gql } from '@apollo/client';

export const ADDED_LIKE = gql`
  subscription MySubscription {
    addedLike {
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
