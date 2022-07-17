import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_PARENT_ID = gql`
  query MyQuery($threadId: ID!) {
    getCommentsByThreadId(threadId: $threadId) {
      data {
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
  }
`;

export const GET_COMMENT = gql`
  query MyQuery($_id: ID!) {
    getComment(_id: $_id) {
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
export const GET_ACTION_COUNTS = gql`
  query MyQuery($threadId: ID!) {
    getActionCounts(threadId: $threadId) {
      commentCount
      likeCount
      likedByUser
    }
  }
`;
