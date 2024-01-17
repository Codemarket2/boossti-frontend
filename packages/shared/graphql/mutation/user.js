import { gql } from '@apollo/client';

const UPDATE_USER_SUBCRIPTION = gql`
  mutation MyMutation($updatedBy: String!, $userId: String!, $subscription: SubscriptionInput) {
    updateUser(updatedBy: $updatedBy, userId: $userId, subscription: $subscription) {
      subscription {
        _id
        active
        amount
        description
        expiringOn
        subscribedOn
        subscriptionType
      }
      _id
      active
      confirmed
      createdAt
      createdBy
      email
      name
      picture
      updatedAt
      updatedBy
      userId
    }
  }
`;

const CANCEL_USER_SUBCRIPTION = gql`
  mutation MyMutation($updatedBy: String!, $userId: String!) {
    cancelUserSubscription(updatedBy: $updatedBy, userId: $userId) {
      subscription {
        _id
        active
        amount
        description
        expiringOn
        subscribedOn
        subscriptionType
      }
      _id
      active
      confirmed
      createdAt
      createdBy
      email
      name
      picture
      updatedAt
      updatedBy
      userId
    }
  }
`;

const ADD_USER_ENPOINT = gql`
  mutation MyMutation($username: String!, $endpoint: String!) {
    addUserEndpoint(username: $username, endpoint: $endpoint)
  }
`;

const UPDATE_STATUS = gql`
  mutation UpdateUserStatus($userId: String!, $updatedBy: String!, $status: Boolean!) {
    updateUserStatus(userId: $userId, updatedBy: $updatedBy, status: $status) {
      _id
      active
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
  UPDATE_STATUS,
  REMOVE_USER_ENPOINT,
  DELETE_OLD_ENDPOINT,
  UPDATE_USER_SUBCRIPTION,
  CANCEL_USER_SUBCRIPTION,
};
