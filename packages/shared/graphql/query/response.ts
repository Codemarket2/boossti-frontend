import { gql } from '@apollo/client';

export const GET_RESPONSE = gql`
  query getResponse($_id: ID!) {
    getResponse(_id: $_id) {
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
      options
    }
  }
`;

export const GET_RESPONSE_BY_COUNT = gql`
  query getResponseByCount($formId: ID!, $count: Int!) {
    getResponseByCount(formId: $formId, count: $count) {
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
      options
    }
  }
`;

export const GET_RESPONSES = gql`
  query MyQuery(
    $formId: ID!
    $parentId: ID
    $responseId: ID
    $page: Int
    $limit: Int
    $search: String
    $formField: ID
    $onlyMy: Boolean
  ) {
    getResponses(
      formId: $formId
      parentId: $parentId
      responseId: $responseId
      page: $page
      limit: $limit
      search: $search
      formField: $formField
      onlyMy: $onlyMy
    ) {
      count
      data {
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
        options
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
        formId {
          _id
          name
        }
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
  }
`;
