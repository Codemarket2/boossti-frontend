import { gql } from '@apollo/client';

export const GET_STAR_RATING = gql`
  query MyQuery($_id: ID!) {
    getStarRating(_id: $_id) {
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

export const GET_STAR_RATINGS_BY_PARENT_ID = gql`
  query MyQuery($parentId: ID!, $page: Int, $limit: Int) {
    getStarRatingsByParentId(parentId: $parentId, page: $page, limit: $limit) {
      data {
        _id
        createdBy {
          _id
          name
          picture
        }
        parentId
        starRating
        createdAt
      }
    }
  }
`;

export const GET_RATING_COUNTS = gql`
  query MyQuery($parentId: ID!) {
    getRatingCounts(parentId: $parentId) {
      averageStarRating
      userStarRating {
        starRating
        _id
      }
      ratingCount
    }
  }
`;
