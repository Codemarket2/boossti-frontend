import { gql } from '@apollo/client';

export const GET_MY_BOOKMARKS = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getMyBookmarks(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        parentId
        bookmark
        createdAt
      }
    }
  }
`;
