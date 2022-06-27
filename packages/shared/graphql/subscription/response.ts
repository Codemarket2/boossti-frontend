import { gql } from '@apollo/client';

export const RESPONSE_SUB = gql`
  subscription MySubscription($formId: ID!) {
    responseSub(formId: $formId) {
      _id
      formId
      count
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
    }
  }
`;

export const DELETED_RESPONSE = gql`
  subscription MySubscription {
    deletedResponse
  }
`;
