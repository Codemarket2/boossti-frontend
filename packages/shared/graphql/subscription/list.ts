import { gql } from '@apollo/client';

export const ADDED_LIST_TYPE = gql`
  subscription MySubscription {
    addedListType {
      _id
      title
      slug
      description
      media {
        url
        caption
      }
    }
  }
`;

export const UPDATED_LIST_TYPE = gql`
  subscription MySubscription($_id: ID!) {
    updatedListType(_id: $_id) {
      _id
      title
      slug
      description
      types {
        _id
        title
        slug
      }
      media {
        url
        caption
      }
      layouts
      fields {
        _id
        label
        fieldType
        options
        typeId {
          _id
          title
          slug
        }
      }
    }
  }
`;

export const ADDED_LIST_ITEM = gql`
  subscription MySubscription {
    addedListItem {
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

export const UPDATED_LIST_ITEM = gql`
  subscription MySubscription($_id: ID!) {
    updatedListItem(_id: $_id) {
      _id
      title
      slug
      description
      types {
        _id
        title
        slug
      }
      media {
        url
        caption
      }
      fields {
        _id
        label
        fieldType
        options
        typeId {
          _id
          title
          slug
        }
      }
    }
  }
`;
