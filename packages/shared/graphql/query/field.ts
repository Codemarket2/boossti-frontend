import { gql } from '@apollo/client';

export const GET_FIELD = gql`
  query GetFieldQuery($_id: ID!) {
    getField(_id: $_id) {
      _id
      parentId
      position
      relationId
      label
      fieldType
      multipleValues
      allowOthers
      typeId {
        _id
        title
        slug
      }
      createdBy {
        _id
      }
      options
    }
  }
`;

export const GET_FIELDS = gql`
  query GetFieldsQuery($parentId: ID!) {
    getFields(parentId: $parentId) {
      _id
      parentId
      position
      relationId
      label
      fieldType
      multipleValues
      allowOthers
      typeId {
        _id
        title
        slug
      }
      createdBy {
        _id
      }
      options
    }
  }
`;

export const GET_FIELD_VALUES = gql`
  query getFieldValues($parentId: ID!, $field: ID!, $limit: Int, $page: Int) {
    getFieldValues(parentId: $parentId, field: $field, limit: $limit, page: $page) {
      count
      data {
        _id
        relationId
        parentId
        field
        value
        valueDate
        valueNumber
        valueBoolean
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
      relationId
      parentId
      field
      value
      valueDate
      valueNumber
      valueBoolean
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

export const GET_PAGE_MENTIONS = gql`
  query MyQuery($_id: ID!) {
    getPageMentions(_id: $_id) {
      data {
        parentId
      }
    }
  }
`;
