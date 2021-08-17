import { gql } from '@apollo/client';

export const CREATE_FIELD = gql`
  mutation MyMutation(
    $parentId: ID!
    $label: String!
    $fieldType: String!
    $typeId: ID
    $multipleValues: Boolean
  ) {
    createField(
      parentId: $parentId
      label: $label
      fieldType: $fieldType
      typeId: $typeId
      multipleValues: $multipleValues
    ) {
      _id
      label
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
    }
  }
`;

export const UPDATE_FIELD = gql`
  mutation MyMutation(
    $_id: ID!
    $label: String
    $fieldType: String
    $typeId: ID
    $multipleValues: Boolean
  ) {
    updateField(
      _id: $_id
      label: $label
      fieldType: $fieldType
      typeId: $typeId
      multipleValues: $multipleValues
    ) {
      _id
      label
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
    }
  }
`;

export const DELETE_FIELD = gql`
  mutation MyMutation($_id: ID!) {
    deleteField(_id: $_id)
  }
`;

export const CREATE_FIELD_VALUE = gql`
  mutation MyMutation($parentId: ID!, $field: ID!, $value: String, $itemId: ID) {
    createFieldValue(parentId: $parentId, field: $field, value: $value, itemId: $itemId) {
      _id
      parentId
      field
      value
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
    }
  }
`;

export const UPDATE_FIELD_VALUE = gql`
  mutation MyMutation($_id: ID!, $value: String, $itemId: ID) {
    updateFieldValue(_id: $_id, value: $value, itemId: $itemId) {
      _id
      parentId
      field
      value
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
    }
  }
`;

export const DELETE_FIELD_VALUE = gql`
  mutation MyMutation($_id: ID!) {
    deleteFieldValue(_id: $_id)
  }
`;
