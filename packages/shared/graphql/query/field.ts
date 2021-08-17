import { gql } from '@apollo/client';

export const GET_FIELDS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $parentId: ID!) {
    getFieldsByType(limit: $limit, page: $page, parentId: $parentId) {
      count
      data {
        _id
        label
        fieldType
        multipleValues
        typeId {
          _id
          title
        }
      }
    }
  }
`;

export const GET_FIELD_VALUES_BY_FIELD = gql`
  query MyQuery($field: ID!, $limit: Int, $page: Int) {
    getFieldValuesByField(field: $field, limit: $limit, page: $page) {
      count
      data {
        _id
        # value
        # itemId {
        #   _id
        #   title
        # }
        # createdBy {
        #   _id
        #   picture
        #   name
        # }
      }
    }
  }
`;
