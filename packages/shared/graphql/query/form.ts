import { gql } from '@apollo/client';

export const GET_FORM = gql`
  query MyQuery($_id: ID!) {
    getForm(_id: $_id) {
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

export const GET_FORM_RELATIONS = gql`
  query getFormRelations($_id: ID!) {
    getFormRelations(_id: $_id) {
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

export const GET_FORM_TAB_RELATIONS = gql`
  query getFormTabRelations($_id: ID!) {
    getFormTabRelations(_id: $_id) {
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

export const GET_FORM_ALL_TABS = gql`
  query getFormAllTabs($formId: ID!) {
    getFormAllTabs(formId: $formId) {
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

export const GET_FORM_BY_SLUG = gql`
  query GetFormBySlug($slug: String!) {
    getFormBySlug(slug: $slug) {
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
      createdBy {
        _id
        values {
          field
          value
        }
      }
    }
  }
`;

export const GET_FORMS = gql`
  query MyQuery($page: Int, $limit: Int, $search: String) {
    getForms(page: $page, limit: $limit, search: $search) {
      count
      data {
        _id
        name
        slug
        fields {
          _id
          # label
          # fieldType
          # options
          # template {
          #   _id
          #   title
          #   slug
          # }
        }
        # settings
        # published
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
  }
`;
