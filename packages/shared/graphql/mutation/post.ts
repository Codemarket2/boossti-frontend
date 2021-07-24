import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation MyMutation($body: String!, $images: [String]) {
    createPost(body: $body, images: $images) {
      _id
      body
      images
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
  mutation MyMutation($_id: ID!, $body: String, $images: [String]) {
    updatePost(_id: $_id, body: $body, images: $images) {
      _id
      body
      images
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
