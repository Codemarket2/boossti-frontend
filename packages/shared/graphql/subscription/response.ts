import { gql } from '@apollo/client';

export const RESPONSE_SUB = gql`
  subscription MySubscription($formId: ID!) {
    responseSub(formId: $formId) {
      _id
      formId
      count
      parentId {
        _id
        title
      }
      responseId
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
    }
  }
`;

export const DELETED_RESPONSE = gql`
  subscription MySubscription {
    deletedResponse
  }
`;
