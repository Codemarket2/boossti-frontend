import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation MyMutation($body: String!, $media: [MediaInput]) {
    createPost(body: $body, media: $media) {
      _id
      body
      media {
        url
        caption
      }
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
  mutation MyMutation($_id: ID!, $body: String, $media: [MediaInput]) {
    updatePost(_id: $_id, body: $body, media: $media) {
      _id
      body
      media {
        url
        caption
      }
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
