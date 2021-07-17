import { gql } from '@apollo/client';

export const CREATE_LIST = gql`
  mutation MyMutation($name: String!) {
    createList(name: $name) {
      _id
      name
      inUse
      active
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation MyMutation($_id: ID!, $name: String) {
    updateList(_id: $_id, name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_LIST = gql`
  mutation MyMutation($_id: ID!) {
    deleteList(_id: $_id)
  }
`;

export const ADD_LIST_ITEM = gql`
  mutation MyMutation($listId: ID!, $title: String!, $description: String) {
    addListItem(listId: $listId, title: $title, description: $description) {
      _id
      name
      inUse
      active
      items {
        _id
        title
        description
        active
      }
    }
  }
`;
export const UPDATE_LIST_ITEM = gql`
  mutation MyMutation($listId: ID!, $_id: ID!, $title: String, $description: String) {
    updateListItem(listId: $listId, _id: $_id, title: $title, description: $description) {
      _id
      name
      inUse
      active
      items {
        _id
        title
        description
        active
      }
    }
  }
`;
export const DELETE_LIST_ITEM = gql`
  mutation MyMutation($listId: ID!, $_id: ID!) {
    deleteListItem(listId: $listId, _id: $_id)
  }
`;
