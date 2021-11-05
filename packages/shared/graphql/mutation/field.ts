import { gql } from '@apollo/client';

export const CREATE_FIELD = gql`
  mutation MyMutation(
    $parentId: ID!
    $label: String!
    $fieldType: String!
    $typeId: ID
    $multipleValues: Boolean
    $oneUserMultipleValues: Boolean
  ) {
    createField(
      parentId: $parentId
      label: $label
      fieldType: $fieldType
      typeId: $typeId
      multipleValues: $multipleValues
      oneUserMultipleValues: $oneUserMultipleValues
    ) {
      _id
      parentId
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

export const UPDATE_FIELD = gql`
  mutation MyMutation(
    $_id: ID!
    $label: String
    $fieldType: String
    $typeId: ID
    $multipleValues: Boolean
    $oneUserMultipleValues: Boolean
  ) {
    updateField(
      _id: $_id
      label: $label
      fieldType: $fieldType
      typeId: $typeId
      multipleValues: $multipleValues
      oneUserMultipleValues: $oneUserMultipleValues
    ) {
      _id
      parentId
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
    $parentId: ID!
    $field: ID!
    $value: String
    $valueDate: AWSDateTime
    $valueNumber: Int
    $valueBoolean: Boolean
    $itemId: ID
    $media: [MediaInput]
  ) {
    createFieldValue(
      parentId: $parentId
      field: $field
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
    $value: String
    $valueDate: AWSDateTime
    $valueNumber: Int
    $valueBoolean: Boolean
    $itemId: ID
    $media: [MediaInput]
  ) {
    updateFieldValue(
      _id: $_id
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
