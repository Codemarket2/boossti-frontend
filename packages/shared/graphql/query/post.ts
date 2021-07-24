import { gql } from '@apollo/client';

export const GET_MY_POSTS = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getMyPosts(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        body
        images
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

export const GET_USER_POSTS = gql`
  query MyQuery($userId: ID!, $limit: Int, $page: Int, $search: String) {
    getPostsByUserId(userId: $userId, limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        body
        images
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

export const GET_POSTS = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getPosts(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        body
        images
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
