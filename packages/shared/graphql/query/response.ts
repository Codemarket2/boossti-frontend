import { gql } from '@apollo/client';

export const GET_RESPONSE = gql`
  query getResponse($_id: ID!) {
    getResponse(_id: $_id) {
      _id
      formId
      count
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
    $templateInstanceId: ID
    $workFlowFormReponseParentId: ID
    $page: Int
    $limit: Int
    $search: String
    $formField: ID
    $onlyMy: Boolean
  ) {
    getResponses(
      formId: $formId
      templateId: $templateId
      templateInstanceId: $templateInstanceId
      workFlowFormReponseParentId: $workFlowFormReponseParentId
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
