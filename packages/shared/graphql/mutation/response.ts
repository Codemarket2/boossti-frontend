import { gql } from '@apollo/client';

export const CREATE_RESPONSE = gql`
  mutation MyMutation(
    $formId: ID!
    $templateId: ID
    # $templateDefaultWidgetResponseId: ID
    $workFlowFormResponseParentId: ID
    $values: [ValueInput]
    $options: AWSJSON
  ) {
    createResponse(
      formId: $formId
      templateId: $templateId
      # templateDefaultWidgetResponseId: $templateDefaultWidgetResponseId
      workFlowFormResponseParentId: $workFlowFormResponseParentId
      values: $values
      options: $options
    ) {
      _id
      formId
      count
      templateId
      # templateDefaultWidgetResponseId
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
        templateInstance {
          _id
          # title
          # slug
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
        templateInstance {
          _id
          # title
          # slug
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
