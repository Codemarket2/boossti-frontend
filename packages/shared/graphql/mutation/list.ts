import { gql } from '@apollo/client';

export const CREATE_LIST_TYPE = gql`
  mutation MyMutation($title: String!, $description: String, $media: [MediaInput]) {
    createListType(title: $title, description: $description, media: $media) {
      _id
      title
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
  mutation MyMutation($_id: ID!, $title: String, $description: String, $media: [MediaInput]) {
    updateListType(_id: $_id, title: $title, description: $description, media: $media) {
      _id
      title
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
        title
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
  mutation MyMutation($_id: ID!, $title: String!, $description: String, $media: [MediaInput]) {
    updateListItem(_id: $_id, title: $title, description: $description, media: $media) {
      _id
      title
      slug
      description
      types {
        _id
        title
        slug
      }
      media {
        url
        caption
      }
    }
  }
`;

export const UPDATE_PUBLISH = gql`
  mutation MyMutation($_id: ID!, $publish: Boolean!) {
    updatePublish(_id: $_id, publish: $publish) {
      _id
      active
    }
  }
`;

export const DELETE_LIST_ITEM = gql`
  mutation MyMutation($_id: ID!) {
    deleteListItem(_id: $_id)
  }
`;
