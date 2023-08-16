import { gql } from '@apollo/client';

export const ADDED_STAR_RATING = gql`
  subscription MySubscription {
    addedStarRating {
      _id
      createdAt
      starRating
      parentId
      createdBy {
        name
        picture
      }
    }
  }
`;
