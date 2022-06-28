import { gql } from '@apollo/client';

export const CREATE_RESPONSE = gql`
  mutation MyMutation(
    $formId: ID!
    $templates: [ResponseTemplateInput]
    # $templateId: ID
    $templateDefaultWidgetResponseId: ID
    $workFlowFormResponseParentId: ID
    $values: [ValueInput]
    $options: AWSJSON
  ) {
    createResponse(
      formId: $formId
      templates: $templates
      # templateId: $templateId
      templateDefaultWidgetResponseId: $templateDefaultWidgetResponseId
      workFlowFormResponseParentId: $workFlowFormResponseParentId
      values: $values
      options: $options
    ) {
      _id
      formId
      count
      # templateId
      templates {
        template {
          _id
          title
          slug
        }
        user {
          _id
          count
          values {
            field
            value
          }
        }
        createdAt
      }
      templateDefaultWidgetResponseId
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
  mutation MyMutation(
    $_id: ID!
    $values: [ValueInput]
    $templates: [ResponseTemplateInput]
    $newTemplates: [ResponseTemplateInput]
  ) {
    updateResponse(_id: $_id, values: $values, templates: $templates, newTemplates: $newTemplates) {
      _id
      templates {
        template {
          _id
          title
          slug
        }
        user {
          _id
          count
          values {
            field
            value
          }
        }
        createdAt
      }
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
          count
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
  mutation MyMutation($_id: ID!, $templateId: ID) {
    deleteResponse(_id: $_id, templateId: $templateId)
  }
`;

export const CREATE_BULK_RESPONSE = gql`
  mutation MyMutation($formId: ID!, $fileUrl: String!, $map: AWSJSON!, $fileData: AWSJSON) {
    createBulkResponses(formId: $formId, fileUrl: $fileUrl, map: $map, fileData: $fileData)
  }
`;
