import { gql } from '@apollo/client';

export const ADDED_POST = gql`
  subscription MySubscription {
    addedPost {
      _id
      body
      createdAt
      createdBy {
        _id
        name
        picture
      }
    }
  }
`;
