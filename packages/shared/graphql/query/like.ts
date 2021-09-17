import { gql } from '@apollo/client';

export const GET_LIKES_BY_PARENT_ID = gql`
  query MyQuery($parentId: ID!) {
    getLikesByParentId(parentId: $parentId) {
      data {
        _id
        like
        parentId
        createdBy {
          name
          picture
        }
      }
    }
  }
`;

export const GET_LIKE = gql`
  query MyQuery($_id: ID!) {
    getLike(_id: $_id) {
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
