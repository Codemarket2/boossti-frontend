import { gql } from '@apollo/client';

export const CREATE_LIST_TYPE = gql`
  mutation MyMutation($title: String!, $description: String, $media: [MediaInput]) {
    createListType(title: $title, description: $description, media: $media) {
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
        typeId {
          _id
          title
          slug
        }
      }
      createdAt
      createdBy {
        _id
        name
      }
    }
  }
`;

export const UPDATE_LIST_TYPE = gql`
  mutation MyMutation(
    $_id: ID!
    $title: String
    $description: String
    $media: [MediaInput]
    $slug: String
  ) {
    updateListType(
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
        typeId {
          _id
          title
          slug
        }
      }
      createdAt
      createdBy {
        _id
        name
      }
    }
  }
`;

export const PUBLISH_LIST_TYPE = gql`
  mutation MyMutation($_id: ID!, $active: Boolean, $showInMenu: Boolean) {
    updateListType(_id: $_id, active: $active, showInMenu: $showInMenu) {
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
        typeId {
          _id
          title
          slug
        }
      }
      createdAt
      createdBy {
        _id
        name
      }
    }
  }
`;

export const UPDATE_LIST_TYPE_FIELDS = gql`
  mutation MyMutation($_id: ID!, $fields: [Field2Input]) {
    updateListType(_id: $_id, fields: $fields) {
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
        typeId {
          _id
          title
          slug
        }
      }
      createdAt
      createdBy {
        _id
        name
      }
    }
  }
`;

export const DELETE_LIST_TYPE = gql`
  mutation MyMutation($_id: ID!) {
    deleteListType(_id: $_id)
  }
`;

export const CREATE_LIST_ITEM = gql`
  mutation MyMutation(
    $types: [ID!]
    $title: String!
    $description: String
    $media: [MediaInput]
    $layouts: AWSJSON
  ) {
    createListItem(
      types: $types
      title: $title
      description: $description
      media: $media
      layouts: $layouts
    ) {
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
      layouts
      types {
        _id
        title
        slug
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
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
        name
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
    }
  }
`;

export const UPDATE_LIST_ITEM_FIELDS = gql`
  mutation MyMutation($_id: ID!, $fields: [Field2Input], $values: [FieldValue2Input]) {
    updateListItem(_id: $_id, fields: $fields, values: $values) {
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
      layouts
      types {
        _id
        title
        slug
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
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
        name
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
    }
  }
`;

export const UPDATE_LIST_ITEM = gql`
  mutation MyMutation(
    $_id: ID!
    $title: String
    $description: String
    $media: [MediaInput]
    $layouts: AWSJSON
    $slug: String
  ) {
    updateListItem(
      _id: $_id
      title: $title
      description: $description
      media: $media
      layouts: $layouts
      slug: $slug
    ) {
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
      layouts
      types {
        _id
        title
        slug
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
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
        name
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
    }
  }
`;

export const PUBLISH_LIST_ITEM = gql`
  mutation MyMutation($_id: ID!, $active: Boolean, $authenticateUser: Boolean) {
    updateListItem(_id: $_id, active: $active, authenticateUser: $authenticateUser) {
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
      layouts
      types {
        _id
        title
        slug
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
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
        name
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
    }
  }
`;

export const UPDATE_LIST_ITEM_LAYOUTS = gql`
  mutation MyMutation($_id: ID!, $layouts: AWSJSON) {
    updateListItem(_id: $_id, layouts: $layouts) {
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
      layouts
      types {
        _id
        title
        slug
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
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
        name
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
    }
  }
`;

export const DELETE_LIST_ITEM = gql`
  mutation MyMutation($_id: ID!) {
    deleteListItem(_id: $_id)
  }
`;
