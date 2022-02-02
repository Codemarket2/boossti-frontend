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

export const GET_RESPONSES = gql`
  query MyQuery(
    $formId: ID!
    $parentId: ID
    $page: Int
    $limit: Int
    $search: String
    $formField: ID
  ) {
    getResponses(
      formId: $formId
      parentId: $parentId
      page: $page
      limit: $limit
      search: $search
      formField: $formField
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
