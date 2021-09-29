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
  subscription MySubscription {
    updateListType {
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

export const ADDED_LIST_ITEM = gql`
  subscription MySubscription {
    AddedListItem {
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
  subscription MySubscription {
    updatedListItem {
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
    }
  }
`;
