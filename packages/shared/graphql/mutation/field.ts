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
