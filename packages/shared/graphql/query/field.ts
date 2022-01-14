import { gql } from '@apollo/client';

export const GET_FIELD_BY_RELATION_ID = gql`
  query MyQuery($relationId: ID!) {
    getFieldByRelationId(relationId: $relationId) {
      _id
      position
      relationId
      label
      fieldLabel
      fieldType
      multipleValues
      oneUserMultipleValues
      typeId {
        _id
        title
        slug
      }
      createdBy {
        _id
      }
    }
  }
`;

export const GET_FIELDS_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $parentId: ID!) {
    getFieldsByType(limit: $limit, page: $page, parentId: $parentId) {
      count
      data {
        _id
        position
        relationId
        label
        fieldLabel
        fieldType
        multipleValues
        oneUserMultipleValues
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
  }
`;

export const GET_FIELD_VALUES_BY_FIELD = gql`
  query MyQuery($parentId: ID!, $field: ID!, $limit: Int, $page: Int) {
    getFieldValuesByItem(parentId: $parentId, field: $field, limit: $limit, page: $page) {
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
