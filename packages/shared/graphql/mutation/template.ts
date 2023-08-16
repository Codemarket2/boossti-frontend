import { gql } from '@apollo/client';

export const CREATE_TEMPLATE = gql`
  mutation MyMutation($title: String!, $fields: [FieldInput!]) {
    createTemplate(title: $title, fields: $fields) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
      showInMenu
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
      options
      createdAt
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

export const UPDATE_TEMPLATE = gql`
  mutation MyMutation(
    $_id: ID!
    $title: String
    $description: String
    $media: [MediaInput]
    $slug: String
  ) {
    updateTemplate(
      _id: $_id
      title: $title
      description: $description
      media: $media
      slug: $slug
    ) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
      showInMenu
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
      options
      createdAt
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

export const PUBLISH_TEMPLATE = gql`
  mutation MyMutation($_id: ID!, $active: Boolean, $showInMenu: Boolean) {
    updateTemplate(_id: $_id, active: $active, showInMenu: $showInMenu) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
      showInMenu
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
      options
      createdAt
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

export const UPDATE_TEMPLATE_FIELDS = gql`
  mutation MyMutation($_id: ID!, $fields: [FieldInput], $options: AWSJSON) {
    updateTemplate(_id: $_id, fields: $fields, options: $options) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
      showInMenu
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
      options
      createdAt
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

export const DELETE_TEMPLATE = gql`
  mutation MyMutation($_id: ID!) {
    deleteTemplate(_id: $_id)
  }
`;

export const CREATE_PAGE = gql`
  mutation MyMutation($template: ID!, $title: String!, $description: String, $media: [MediaInput]) {
    createPage(template: $template, title: $title, description: $description, media: $media) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      options
      template {
        _id
        title
        slug
      }
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
      createdAt
      createdBy {
        _id
        values {
          field
          value
        }
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        media {
          url
          caption
        }
        template {
          _id
          title
          slug
        }
        page {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
        response {
          _id
          values {
            field
            value
          }
        }
        options
      }
    }
  }
`;

export const UPDATE_PAGE_FIELDS = gql`
  mutation MyMutation($_id: ID!, $fields: [FieldInput], $values: [ValueInput], $options: AWSJSON) {
    updatePage(_id: $_id, fields: $fields, values: $values, options: $options) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      options
      template {
        _id
        title
        slug
      }
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
      createdAt
      createdBy {
        _id
        values {
          field
          value
        }
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        media {
          url
          caption
        }
        template {
          _id
          title
          slug
        }
        page {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
        response {
          _id
          values {
            field
            value
          }
        }
        options
      }
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation MyMutation(
    $_id: ID!
    $title: String
    $description: String
    $media: [MediaInput]
    $slug: String
  ) {
    updatePage(_id: $_id, title: $title, description: $description, media: $media, slug: $slug) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      options
      template {
        _id
        title
        slug
      }
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
      createdAt
      createdBy {
        _id
        values {
          field
          value
        }
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        media {
          url
          caption
        }
        template {
          _id
          title
          slug
        }
        page {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
        response {
          _id
          values {
            field
            value
          }
        }
        options
      }
    }
  }
`;

export const PUBLISH_PAGE = gql`
  mutation MyMutation($_id: ID!, $active: Boolean, $authenticateUser: Boolean) {
    updatePage(_id: $_id, active: $active, authenticateUser: $authenticateUser) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      options
      template {
        _id
        title
        slug
      }
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
      createdAt
      createdBy {
        _id
        values {
          field
          value
        }
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        media {
          url
          caption
        }
        template {
          _id
          title
          slug
        }
        page {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
        response {
          _id
          values {
            field
            value
          }
        }
        options
      }
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation MyMutation($_id: ID!) {
    deletePage(_id: $_id)
  }
`;
