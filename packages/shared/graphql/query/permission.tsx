import { gql } from '@apollo/client';

export const CHECK_PERMISSION = gql`
  query CheckPermission($actionType: actionType, $formId: ID, $responseId: ID, $appId: ID) {
    checkPermission(
      actionType: $actionType
      formId: $formId
      responseId: $responseId
      appId: $appId
    )
  }
`;
