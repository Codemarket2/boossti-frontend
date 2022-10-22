import { gql } from '@apollo/client';

export const GET_RESPONSE = gql`
  query getResponse($_id: ID!, $appId: ID) {
    getResponse(_id: $_id, appId: $appId) {
      _id
      formId
      count
      appId
      parentResponseId
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
            # valueNumber
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
      options
    }
  }
`;

export const GET_RESPONSE_BY_COUNT = gql`
  query getResponseByCount($formId: ID!, $count: Int!, $appId: ID) {
    getResponseByCount(formId: $formId, count: $count, appId: $appId) {
      _id
      formId
      count
      appId
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
            # valueNumber
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
      options
    }
  }
`;

export const GET_RESPONSES = gql`
  query getResponses(
    $formId: ID!
    $appId: ID
    $parentResponseId: ID
    $workFlowFormResponseParentId: ID
    $page: Int
    $limit: Int
    $search: String
    $formField: ID
    $onlyMy: Boolean
    $valueFilter: AWSJSON
  ) {
    getResponses(
      formId: $formId
      appId: $appId
      parentResponseId: $parentResponseId
      workFlowFormResponseParentId: $workFlowFormResponseParentId
      page: $page
      limit: $limit
      search: $search
      formField: $formField
      onlyMy: $onlyMy
      valueFilter: $valueFilter
    ) {
      count
      data {
        _id
        formId
        count
        appId
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
              # valueNumber
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
        appId
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
              # valueNumber
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
  }
`;
