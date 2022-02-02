import { gql } from '@apollo/client';

export const ADDED_FIELD = gql`
  subscription MySubscription {
    addedField {
      _id
      parentId
      position
      relationId
      label
      fieldType
      multipleValues
      allowOthers
      typeId {
        _id
        title
        slug
      }
      createdBy {
        _id
      }
      options
    }
  }
`;

export const DELETE_FIELD_SUB = gql`
  subscription deleteFieldSub {
    deleteFieldSub
  }
`;

export const ADDED_FIELD_VALUE = gql`
  subscription MySubscription {
    addedFieldValue {
      _id
      parentId
      relationId
      field
      value
      media {
        url
        caption
      }
      itemId {
        _id
        title
        slug
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

export const DELETE_FIELD_VALUE_SUB = gql`
  subscription deleteFieldValueSub {
    deleteFieldValueSub
  }
`;
