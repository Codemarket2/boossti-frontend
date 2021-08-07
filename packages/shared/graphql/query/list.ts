import { gql } from '@apollo/client';

export const GET_LIST_TYPES = gql`
  query MyQuery($limit: Int, $page: Int) {
    getListTypes(limit: $limit, page: $page) {
      count
      data {
        _id
        name
        description
        media {
          url
          caption
        }
        inUse
        active
      }
    }
  }
`;

export const GET_LIST_ITEMS = gql`
  query MyQuery($limit: Int, $page: Int) {
    getListItems(limit: $limit, page: $page) {
      count
      data {
        _id
        title
        description
        types {
          _id
          name
        }
        media {
          url
          caption
        }
      }
    }
  }
`;

export const GET_LIST_ITEMS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $types: [ID]) {
    getListItems(limit: $limit, page: $page, types: $types) {
      count
      data {
        _id
        title
        description
        types {
          _id
          name
        }
        media {
          url
          caption
        }
      }
    }
  }
`;

export const GET_LIST = gql`
  query MyQuery($_id: ID!) {
    getList(_id: $_id) {
      __typename
      ... on ListType {
        _id
      }
      ... on ListItem {
        _id
      }
    }
  }
`;
