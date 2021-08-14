import { gql } from '@apollo/client';

export const GET_FIELDS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $parentId: ID!) {
    getFieldsByType(limit: $limit, page: $page, parentId: $parentId) {
      count
      data {
        _id
        label
        fieldType
      }
    }
  }
`;
