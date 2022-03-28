import { gql } from '@apollo/client';

export const GET_TEMPLATES = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getTemplates(limit: $limit, page: $page, search: $search) {
      count
      data {
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
        createdAt
        createdBy {
          _id
          name
        }
      }
    }
  }
`;

export const GET_TEMPLATE_BY_SLUG = gql`
  query MyQuery($slug: String!) {
    getTemplateBySlug(slug: $slug) {
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
        name
      }
    }
  }
`;

export const GET_MENU_TEMPLATES = gql`
  query getMenuTemplates {
    getMenuTemplates {
      _id
      slug
      title
    }
  }
`;

export const GET_PAGES_BY_TYPE = gql`
  query MyQuery($limit: Int, $page: Int, $template: ID, $search: String) {
    getPages(limit: $limit, page: $page, template: $template, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        template {
          _id
          title
          slug
        }
        media {
          url
          caption
        }
        createdAt
        createdBy {
          _id
          name
        }
      }
    }
  }
`;

export const GET_PAGES = gql`
  query MyQuery($limit: Int, $page: Int, $template: ID, $search: String) {
    getPages(limit: $limit, page: $page, template: $template, search: $search) {
      count
      data {
        _id
        slug
        title
        description
        template {
          _id
          title
          slug
        }
      }
    }
  }
`;

export const GET_MENTION_ITEMS = gql`
  query MyQuery($search: String) {
    getMentionItems(search: $search) {
      title
      _id
      category
      type
    }
  }
`;

export const GET_PAGE_BY_SLUG = gql`
  query getPageBySlug($slug: String!) {
    getPageBySlug(slug: $slug) {
      _id
      active
      authenticateUser
      slug
      title
      description
      media {
        url
        caption
      }
      options
      template {
        _id
        title
        slug
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
      createdAt
      createdBy {
        _id
        name
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

export const GET_PAGE_BY_ID = gql`
  query MyQuery($_id: ID!) {
    getPage(_id: $_id) {
      slug
      template {
        slug
      }
    }
  }
`;

export const GET_LIST_PAGE_MENTIONS = gql`
  query MyQuery($_id: ID!) {
    getListPageMentions(_id: $_id) {
      data {
        _id
      }
    }
  }
`;
