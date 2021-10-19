import { gql } from '@apollo/client';

export const GET_FIELDS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $parentId: ID!) {
    getFieldsByType(limit: $limit, page: $page, parentId: $parentId) {
      count
      data {
        _id
        position
        label
        fieldType
        multipleValues
        oneUserMultipleValues
        typeId {
          _id
          title
          slug
        }
      }
    }
  }
`;

export const GET_FIELD_VALUES_BY_FIELD = gql`
  query MyQuery($parentId: ID!, $field: ID!, $limit: Int, $page: Int) {
    getFieldValuesByItem(parentId: $parentId, field: $field, limit: $limit, page: $page) {
      count
      data {
        _id
        parentId
        field
        value
        media {
          url
          caption
        }
        itemId {
          _id
          title
          slug
        }
        createdBy {
          _id
          picture
          name
        }
        createdAt
      }
    }
  }
`;
export const GET_FIELD_VALUE = gql`
  query MyQuery($_id: ID!) {
    getFieldValue(_id: $_id) {
      _id
      parentId
      field
      value
      media {
        url
        caption
      }
      itemId {
        _id
        title
        slug
      }
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;
