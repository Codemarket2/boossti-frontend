import { gql } from '@apollo/client';

export const ADDED_FIELD = gql`
  subscription MySubscription {
    addedField {
      _id
      parentId
      relationId
      position
      label
      fieldType
      typeId {
        _id
        title
        slug
      }
      multipleValues
      oneUserMultipleValues
    }
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
