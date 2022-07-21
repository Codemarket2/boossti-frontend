import { gql } from '@apollo/client';

export const ADDED_COMMENT = gql`
  subscription MySubscription($threadId: ID!) {
    addedComment(threadId: $threadId) {
      _id
      body
      threadId
      parentIds
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
