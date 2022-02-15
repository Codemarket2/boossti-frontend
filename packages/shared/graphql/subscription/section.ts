import { gql } from '@apollo/client';

export const SECTION_SUB = gql`
  subscription sectionSub($_id: ID!) {
    sectionSub(_id: $_id) {
      _id
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
      options
    }
  }
`;
