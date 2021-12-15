import { gql } from '@apollo/client';

export const GET_RESPONSE = gql`
  query MyQuery($_id: ID!) {
    getResponse(_id: $_id) {
      _id
      formId
      parentId
      values {
        _id
        field
        value
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

export const GET_RESPONSES = gql`
  query MyQuery($formId: ID!, $page: Int, $limit: Int) {
    getResponses(formId: $formId, page: $page, limit: $limit) {
      count
      data {
        _id
        formId
        parentId
        values {
          _id
          field
          value
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
        }
        createdBy {
          _id
          picture
          name
        }
        createdAt
      }
    }
  }
`;

export const GET_MY_RESPONSES = gql`
  query MyQuery {
    getMyResponses {
      count
      data {
        _id
        formId
        parentId
        values {
          _id
          field
          value
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
        }
        createdBy {
          _id
          picture
          name
        }
        createdAt
      }
    }
  }
`;
