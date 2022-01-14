import { gql } from '@apollo/client';

export const CREATE_FIELD = gql`
  mutation MyMutation(
    $parentId: ID!
    $_id: ID
    $label: String!
    $fieldLabel: String
    $fieldType: String!
    $typeId: ID
    $multipleValues: Boolean
    $oneUserMultipleValues: Boolean
    $relationId: ID
  ) {
    createField(
      _id: $_id
      parentId: $parentId
      label: $label
      fieldLabel: $fieldLabel
      fieldType: $fieldType
      typeId: $typeId
      multipleValues: $multipleValues
      oneUserMultipleValues: $oneUserMultipleValues
      relationId: $relationId
    ) {
      _id
      parentId
      relationId
      position
      label
      fieldLabel
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
      oneUserMultipleValues
      options
    }
  }
`;

export const UPDATE_FIELD = gql`
  mutation MyMutation(
    $_id: ID!
    $relationId: ID
    $label: String
    $fieldLabel: String
    $parentId: ID
    $fieldType: String
    $typeId: ID
    $multipleValues: Boolean
    $oneUserMultipleValues: Boolean
  ) {
    updateField(
      _id: $_id
      relationId: $relationId
      parentId: $parentId
      label: $label
      fieldLabel: $fieldLabel
      fieldType: $fieldType
      typeId: $typeId
      multipleValues: $multipleValues
      oneUserMultipleValues: $oneUserMultipleValues
    ) {
      _id
      relationId
      parentId
      position
      label
      fieldLabel
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
      oneUserMultipleValues
      options
    }
  }
`;

export const UPDATE_FIELD_OPTIONS = gql`
  mutation MyMutation($_id: ID!, $options: AWSJSON) {
    updateField(_id: $_id, options: $options) {
      _id
      options
    }
  }
`;

export const UPDATE_FIELD_POSITION = gql`
  mutation MyMutation($_id: ID!, $position: Float!) {
    updateFieldPosition(_id: $_id, position: $position) {
      _id
      position
      label
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
      oneUserMultipleValues
    }
  }
`;

export const DELETE_FIELD = gql`
  mutation MyMutation($_id: ID!) {
    deleteField(_id: $_id)
  }
`;

export const CREATE_FIELD_VALUE = gql`
  mutation MyMutation(
    $_id: ID!
    $parentId: ID!
    $field: ID!
    $relationId: ID!
    $value: String
    $valueDate: AWSDateTime
    $valueNumber: Int
    $valueBoolean: Boolean
    $itemId: ID
    $media: [MediaInput]
  ) {
    createFieldValue(
      _id: $_id
      parentId: $parentId
      field: $field
      relationId: $relationId
      value: $value
      valueNumber: $valueNumber
      valueBoolean: $valueBoolean
      valueDate: $valueDate
      itemId: $itemId
      media: $media
    ) {
      _id
      parentId
      field
      relationId
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

export const UPDATE_FIELD_VALUE = gql`
  mutation MyMutation(
    $_id: ID!
    $parentId: ID
    $field: ID
    $relationId: ID
    $value: String
    $valueDate: AWSDateTime
    $valueNumber: Int
    $valueBoolean: Boolean
    $itemId: ID
    $media: [MediaInput]
  ) {
    updateFieldValue(
      _id: $_id
      parentId: $parentId
      field: $field
      relationId: $relationId
      value: $value
      valueNumber: $valueNumber
      valueBoolean: $valueBoolean
      valueDate: $valueDate
      itemId: $itemId
      media: $media
    ) {
      _id
      parentId
      relationId
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

export const DELETE_FIELD_VALUE = gql`
  mutation MyMutation($_id: ID!) {
    deleteFieldValue(_id: $_id)
  }
`;
