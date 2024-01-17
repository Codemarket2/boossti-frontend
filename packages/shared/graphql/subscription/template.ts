import { gql } from '@apollo/client';

export const ADDED_TEMPLATE = gql`
  subscription MySubscription {
    addedTemplate {
      _id
      title
      slug
      description
      media {
        url
        caption
      }
      createdAt
      createdBy {
        _id
        values {
          field
          value
        }
      }
    }
  }
`;

export const UPDATED_TEMPLATE = gql`
  subscription MySubscription($_id: ID!) {
    updatedTemplate(_id: $_id) {
      _id
      slug
      title
      description
      media {
        url
        caption
      }
      inUse
      active
      showInMenu
      fields {
        _id
        label
        fieldType
        options
        template {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
      }
      options
      createdAt
      createdBy {
        _id
        values {
          field
          value
        }
      }
    }
  }
`;

export const ADDED_PAGE = gql`
  subscription MySubscription {
    addedPage {
      _id
      title
      slug
      description
      description
      media {
        url
        caption
      }
    }
  }
`;

export const UPDATED_PAGE = gql`
  subscription MySubscription($_id: ID!) {
    updatedPage(_id: $_id) {
      _id
      title
      slug
      description
      template {
        _id
        title
        slug
      }
      options
      media {
        url
        caption
      }
      fields {
        _id
        label
        fieldType
        options
        template {
          _id
          title
          slug
        }
        form {
          _id
          name
        }
      }
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
    }
  }
`;
