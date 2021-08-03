import { gql } from '@apollo/client';

export const GET_LISTS = gql`
  query MyQuery($limit: Int, $page: Int) {
    getLists(limit: $limit, page: $page) {
      count
      data {
        _id
        name
        inUse
        active
      }
    }
  }
`;

export const GET_INUSE_LISTS = gql`
  query MyQuery($limit: Int, $page: Int) {
    getLists(limit: $limit, page: $page) {
      count
      data {
        _id
        name
        items {
          _id
          title
          description
          media {
            url
            caption
          }
        }
      }
    }
  }
`;

export const GET_LIST = gql`
  query MyQuery($_id: ID!) {
    getList(_id: $_id) {
      _id
      name
      inUse
      active
      items {
        _id
        title
        description
        active
        media {
          url
          caption
        }
      }
    }
  }
`;
