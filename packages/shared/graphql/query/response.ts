import { gql } from '@apollo/client';

export const GET_RESPONSE = gql`
  query getResponse($_id: ID!) {
    getResponse(_id: $_id) {
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
  query getResponseByCount($formId: ID!, $count: Int!) {
    getResponseByCount(formId: $formId, count: $count) {
      _id
      formId
      count
      templateId
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
    $templateId: ID
    $templateDefaultWidgetResponseId: ID
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
      templateId: $templateId
      templateDefaultWidgetResponseId: $templateDefaultWidgetResponseId
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
