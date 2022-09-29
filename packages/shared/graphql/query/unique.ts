import { gql } from '@apollo/client';

export const GET_CHECK_UNIQUE = gql`
  query MyQuery(
    $formId: ID!
    $value: ValueInput
    $responseId: ID
    $caseInsensitiveUnique: Boolean
    $fieldType: String!
  ) {
    getCheckUnique(
      formId: $formId
      value: $value
      responseId: $responseId
      caseInsensitiveUnique: $caseInsensitiveUnique
      fieldType: $fieldType
    )
  }
`;
