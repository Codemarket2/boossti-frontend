import { gql } from '@apollo/client';

export const GET_AUDIT_LOGS = gql`
  query getAuditLogs($limit: Int, $page: Int, $documentId: ID, $formId: ID) {
    getAuditLogs(limit: $limit, page: $page, documentId: $documentId, formId: $formId) {
      count
      data {
        _id
        documentId
        action
        createdAt
        createdBy {
          _id
          count
          values {
            field
            value
          }
        }
        model
        diff
      }
    }
  }
`;
