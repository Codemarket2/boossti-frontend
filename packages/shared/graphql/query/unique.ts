import { gql } from '@apollo/client';

export const GET_CHECK_UNIQUE = gql`
  query MyQuery(
    $appId: ID
    $formId: ID!
    $responseId: ID
    $valueFilter: AWSJSON! # $value: ValueInput # $caseInsensitiveUnique: Boolean # $fieldType: String!
  ) {
    getCheckUnique(
      appId: $appId
      formId: $formId
      responseId: $responseId
      valueFilter: $valueFilter
      # value: $value
      # caseInsensitiveUnique: $caseInsensitiveUnique
      # fieldType: $fieldType
    )
  }
`;
