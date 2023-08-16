import { gql } from '@apollo/client';

export const GET_ALL_FORMOPTION = gql`
  query GetAllFormOptions($filter: String) {
    getAllFormOptions(filter: $filter) {
      _id
      title
      options {
        label
        value
      }
      formName
      published
    }
  }
`;
