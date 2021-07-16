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
