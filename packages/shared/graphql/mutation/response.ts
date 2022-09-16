import { gql } from '@apollo/client';

export const CREATE_RESPONSE = gql`
  mutation MyMutation(
    $formId: ID!
    $appId: ID
    $installId: ID
    $workFlowFormResponseParentId: ID
    $values: [ValueInput]
    $options: AWSJSON
  ) {
    createResponse(
      formId: $formId
      appId: $appId
      installId: $installId
      workFlowFormResponseParentId: $workFlowFormResponseParentId
      values: $values
      options: $options
    ) {
      _id
      formId
      count
      appId
      installId
      workFlowFormResponseParentId
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        media {
          url
          caption
        }
        template {
          _id
          title
          slug
        }
        page {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
        response {
          _id
          values {
            field
            value
            valueNumber
          }
        }
        options
      }
      createdBy {
        _id
        count
        values {
          field
          value
        }
      }
      createdAt
      options
    }
  }
`;

export const UPDATE_RESPONSE = gql`
  mutation MyMutation($_id: ID!, $values: [ValueInput]) {
    updateResponse(_id: $_id, values: $values) {
      _id
      formId
      count
      appId
      installId
      workFlowFormResponseParentId
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        media {
          url
          caption
        }
        template {
          _id
          title
          slug
        }
        page {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
        response {
          _id
          values {
            field
            value
            valueNumber
          }
        }
        options
      }
      createdBy {
        _id
        count
        values {
          field
          value
        }
      }
      createdAt
      options
    }
  }
`;

export const DELETE_RESPONSE = gql`
  mutation MyMutation($_id: ID!) {
    deleteResponse(_id: $_id)
  }
`;

export const CREATE_BULK_RESPONSE = gql`
  mutation MyMutation($formId: ID!, $fileUrl: String!, $map: AWSJSON!, $fileData: AWSJSON) {
    createBulkResponses(formId: $formId, fileUrl: $fileUrl, map: $map, fileData: $fileData)
  }
`;

export const RESOLVE_CONDITION = gql`
  mutation ResolveCondition($responseId: ID!, $conditions: AWSJSON) {
    resolveCondition(responseId: $responseId, conditions: $conditions)
  }
`;
