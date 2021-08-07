import { gql } from '@apollo/client';

export const CREATE_LIST_TYPE = gql`
  mutation MyMutation($name: String!) {
    createListType(name: $name) {
      _id
      name
    }
  }
`;
export const UPDATE_LIST_TYPE = gql`
  mutation MyMutation($_id: ID!, $name: String) {
    updateListType(_id: $_id, name: $name) {
      _id
      name
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
      description
      types {
        _id
        name
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
      description
      types {
        _id
        name
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
