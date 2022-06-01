import { gql } from '@apollo/client';

export const UPDATED_FORM = gql`
  subscription MySubscription($_id: ID!) {
    updatedForm(_id: $_id) {
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
        # picture
        # name
      }
      createdAt
    }
  }
`;
export const FORM_SUB = gql`
  subscription MySubscription {
    formSub {
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
      }
      settings
      published
      createdBy {
        _id
        # picture
        # name
      }
      createdAt
    }
  }
`;
