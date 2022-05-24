import { gql } from '@apollo/client';

export const GET_CHECK_UNIQUE = gql`
  query MyQuery($formId: ID!, $value: ValueInput, $responseId: ID) {
    getCheckUnique(formId: $formId, value: $value, responseId: $responseId)
  }
`;
