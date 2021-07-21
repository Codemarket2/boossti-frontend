import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers(
    $limit: Int!
    $page: Int!
    $search: String
    $sortBy: String
    $active: Boolean
    $lowerRange: AWSDateTime
    $higherRange: AWSDateTime
  ) {
    getUsers(
      limit: $limit
      page: $page
      search: $search
      sortBy: $sortBy
      active: $active
      lowerRange: $lowerRange
      higherRange: $higherRange
    ) {
      count
      users {
        _id
        active
        confirmed
        email
        name
        picture
        userId
        createdAt
      }
    }
  }
`;

export const GET_USER = gql`
  query QUERY($_id: ID!) {
    getUser(_id: $_id) {
      _id
      name
      picture
    }
  }
`;
