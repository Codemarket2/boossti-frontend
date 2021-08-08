import { gql } from '@apollo/client';

export const CREATE_LIST_TYPE = gql`
  mutation MyMutation($name: String!, $description: String, $media: [MediaInput]) {
    createListType(name: $name, description: $description, media: $media) {
      _id
      name
      slug
      description
      media {
        url
        caption
      }
    }
  }
`;
export const UPDATE_LIST_TYPE = gql`
  mutation MyMutation($_id: ID!, $name: String, $description: String, $media: [MediaInput]) {
    updateListType(_id: $_id, name: $name, description: $description, media: $media) {
      _id
      name
      slug
      description
      media {
        url
        caption
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
  mutation MyMutation($types: [ID!], $title: String!, $description: String, $media: [MediaInput]) {
    createListItem(types: $types, title: $title, description: $description, media: $media) {
      _id
      title
      slug
      description
      types {
        _id
        name
        slug
      }
      media {
        url
        caption
      }
    }
  }
`;
export const UPDATE_LIST_ITEM = gql`
  mutation MyMutation(
    $_id: ID!
    $types: [ID!]
    $title: String!
    $description: String
    $media: [MediaInput]
  ) {
    updateListItem(
      _id: $_id
      types: $types
      title: $title
      description: $description
      media: $media
    ) {
      _id
      title
      slug
      description
      types {
        _id
        name
        slug
      }
      media {
        url
        caption
      }
    }
  }
`;

export const DELETE_LIST_ITEM = gql`
  mutation MyMutation($_id: ID!) {
    deleteListItem(_id: $_id)
  }
`;
