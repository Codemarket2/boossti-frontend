import { gql } from '@apollo/client';

export const GET_CHECK_UNIQUE = gql`
  query MyQuery($values: [ValueInput], $_id: ID!) {
    getCheckUnique(values: $values, _id: $_id) {
      res
      fieldId
    }
  }
`;
