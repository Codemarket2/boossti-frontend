import { gql } from '@apollo/client';

export const CHECK_PERMISSION = gql`
  query CheckPermission(
    $actionType: actionType
    $model: modelType
    $formId: ID
    $responseId: ID
    $appId: ID
  ) {
    checkPermission(
      actionType: $actionType
      model: $model
      formId: $formId
      responseId: $responseId
      appId: $appId
    )
  }
`;
