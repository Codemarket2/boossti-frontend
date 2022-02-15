import { gql } from '@apollo/client';

export const GET_SECTION = gql`
  query getSection($_id: ID!) {
    getSection(_id: $_id) {
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
