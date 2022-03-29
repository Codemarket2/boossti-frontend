import { gql } from '@apollo/client';

export const CREATE_FORM = gql`
  mutation MyMutation(
    $parentId: ID
    $name: String!
    $fields: [FieldInput]
    $settings: AWSJSON
    $virtualForm: Boolean
  ) {
    createForm(
      parentId: $parentId
      name: $name
      fields: $fields
      settings: $settings
      virtualForm: $virtualForm
    ) {
      _id
      parentId
      name
      slug
      fields {
        _id
        label
        fieldType
        options
        template {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
      }
      settings
      published
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_FORM = gql`
  mutation MyMutation(
    $_id: ID!
    $parentId: ID
    $name: String!
    $fields: [FieldInput]
    $settings: AWSJSON
  ) {
    updateForm(_id: $_id, parentId: $parentId, name: $name, fields: $fields, settings: $settings) {
      _id
      parentId
      name
      slug
      fields {
        _id
        label
        fieldType
        options
        template {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
      }
      settings
      published
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;

export const DELETE_FORM = gql`
  mutation MyMutation($_id: ID!) {
    deleteForm(_id: $_id)
  }
`;
