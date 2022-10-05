import { gql } from '@apollo/client';

export const GET_CHECK_UNIQUE = gql`
  query MyQuery(
    $formId: ID!
    $responseId: ID
    $valueFilter: AWSJSON! # $value: ValueInput # $caseInsensitiveUnique: Boolean # $fieldType: String!
  ) {
    getCheckUnique(
      formId: $formId
      responseId: $responseId
      valueFilter: $valueFilter
      # value: $value
      # caseInsensitiveUnique: $caseInsensitiveUnique
      # fieldType: $fieldType
    )
  }
`;
