import { gql } from '@apollo/client';

export const GET_MY_POSTS = gql`
  query MyQuery($limit: Int, $page: Int) {
    getMyPosts(limit: $limit, page: $page) {
      count
      data {
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
  }
`;
