import { gql } from '@apollo/client';

export const CREATE_FORM = gql`
  mutation MyMutation(
    $name: String!
    $fields: [FieldInput]
    $settings: AWSJSON
    $virtualForm: Boolean
  ) {
    createForm(name: $name, fields: $fields, settings: $settings, virtualForm: $virtualForm) {
      _id
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
        values {
          field
          value
        }
      }
      createdAt
    }
  }
`;

export const UPDATE_FORM = gql`
  mutation MyMutation($_id: ID!, $name: String!, $fields: [FieldInput], $settings: AWSJSON) {
    updateForm(_id: $_id, name: $name, fields: $fields, settings: $settings) {
      _id
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
        values {
          field
          value
        }
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
