import { gql } from '@apollo/client';

export const CREATE_RESPONSE = gql`
  mutation MyMutation(
    $formId: ID!
    $parentId: ID
    $templateId: ID
    $workFlowFormReponseParentId: ID
    $values: [ValueInput]
    $options: AWSJSON
  ) {
    createResponse(
      formId: $formId
      parentId: $parentId
      templateId: $templateId
      workFlowFormReponseParentId: $workFlowFormReponseParentId
      values: $values
      options: $options
    ) {
      _id
      formId
      count
      parentId {
        _id
        title
      }
      templateId
      workFlowFormReponseParentId
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
  mutation MyMutation(
    $formId: ID!
    $fileUrl: String!
    $map: AWSJSON!
    $parentId: ID
    $fileData: AWSJSON
  ) {
    createBulkResponses(
      formId: $formId
      fileUrl: $fileUrl
      map: $map
      parentId: $parentId
      fileData: $fileData
    )
  }
`;
