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
        # picture
        # name
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
