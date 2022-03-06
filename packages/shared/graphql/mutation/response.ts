import { gql } from '@apollo/client';

export const CREATE_RESPONSE = gql`
  mutation MyMutation(
    $formId: ID!
    $parentId: [ID]
    $values: [FieldValue2Input]
    $options: AWSJSON
  ) {
    createResponse(formId: $formId, parentId: $parentId, values: $values, options: $options) {
      _id
      formId
      count
      parentId {
        _id
        title
      }
      values {
        _id
        field
        value
        values
        valueNumber
        valueBoolean
        valueDate
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
      }
      createdBy {
        _id
        picture
        name
      }
      createdAt
      options
    }
  }
`;

export const UPDATE_RESPONSE = gql`
  mutation MyMutation($_id: ID!, $values: [FieldValue2Input]) {
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
        itemId {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        response {
          _id
          values {
            field
            value
          }
        }
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
    $parentId: [ID]
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
