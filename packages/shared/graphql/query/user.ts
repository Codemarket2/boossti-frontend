import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query getUsers(
    $limit: Int!
    $page: Int!
    $search: String
    $sortBy: String
    $bookings: Int
    $listings: Int
    $active: Boolean
    $lowerRange: AWSDateTime
    $higherRange: AWSDateTime
  ) {
    getUsers(
      limit: $limit
      page: $page
      search: $search
      sortBy: $sortBy
      bookings: $bookings
      listings: $listings
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

const GET_ONE = gql`
  query QUERY($userId: String!) {
    getUserByCognitoUserId(userId: $userId) {
      subscription {
        _id
        active
        amount
        description
        expiringOn
        subscribedOn
        subscriptionType
      }
      _id
      active
      confirmed
      createdAt
      createdBy
      email
      name
      picture
      updatedAt
      updatedBy
      userId
    }
  }
`;

export default {
  GET_ALL,
  GET_ONE,
};
