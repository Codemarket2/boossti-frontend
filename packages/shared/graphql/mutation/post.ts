import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation MyMutation($body: String!) {
    createPost(body: $body) {
      _id
      body
      createdAt
      createdBy {
        _id
        name
        picture
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation MyMutation($_id: ID!, $body: String) {
    updatePost(_id: $_id, body: $body) {
      _id
      body
      createdAt
      createdBy {
        _id
        name
        picture
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation MyMutation($_id: ID!) {
    deletePost(_id: $_id)
  }
`;
