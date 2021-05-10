import { gql } from '@apollo/client';

const ADD_USER_ENPOINT = gql`
  mutation MyMutation($username: String!, $endpoint: String!) {
    addUserEndpoint(username: $username, endpoint: $endpoint)
  }
`;

const UPDATE_ONE = gql`
  mutation ToggleOneUserStatus($username: String!, $updatedBy: String!, $status: Boolean!) {
    toggleOneUserStatus(username: $username, updatedBy: $updatedBy, status: $status) {
      _id
    }
  }
`;

const REMOVE_USER_ENPOINT = gql`
  mutation MyMutation($username: String!, $endpoint: String!) {
    removeUserEndpoint(username: $username, endpoint: $endpoint)
  }
`;
const DELETE_OLD_ENDPOINT = gql`
  mutation MyMutation($userId: String!) {
    deleteOldEndpoint(userId: $userId)
  }
`;

export default {
  ADD_USER_ENPOINT,
  UPDATE_ONE,
  REMOVE_USER_ENPOINT,
  DELETE_OLD_ENDPOINT,
};
