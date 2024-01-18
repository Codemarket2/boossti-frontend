import { gql } from '@apollo/client';

export const UPDATE_SECTION = gql`
  mutation updateSection(
    $_id: ID!
    $fields: [FieldInput]
    $values: [ValueInput]
    $options: AWSJSON
  ) {
    updateSection(_id: $_id, fields: $fields, values: $values, options: $options) {
      _id
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
      options
    }
  }
`;
