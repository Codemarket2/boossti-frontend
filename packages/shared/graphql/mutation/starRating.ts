import { gql } from '@apollo/client';

export const CREATE_STAR_RATING = gql`
  mutation MyMutation($parentId: ID!, $starRating: Int!) {
    createStarRating(parentId: $parentId, starRating: $starRating) {
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

export const UPDATE_STAR_RATING = gql`
  mutation MyMutation($_id: ID!, $starRating: Int!) {
    updateStarRating(_id: $_id, starRating: $starRating) {
      _id
      starRating
    }
  }
`;

export const DELETE_STAR_RATING = gql`
  mutation MyMutation($parentId: ID!) {
    deleteStarRating(parentId: $parentId)
  }
`;
