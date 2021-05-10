import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query GetAllUsers(
    $limit: Int!
    $page: Int!
    $search: String
    $sortBy: String
    $bookings: Int
    $listings: Int
    $active: Boolean
    $lowerRange: String
    $higherRange: String
  ) {
    getAllUsersSearch(
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
        status
        username
        bookings
        listings
        createdAt
      }
    }
  }
`;

const GET_ONE = gql`
  query QUERY($username: String!) {
    getOneUserSub(username: $username) {
      _id
      active
      confirmed
      email
      name
      picture
      status
      username
      bookings
      listings
    }
  }
`;

export default {
  GET_ALL,
  GET_ONE,
};
