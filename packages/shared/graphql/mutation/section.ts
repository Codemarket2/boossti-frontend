import { gql } from '@apollo/client';

export const UPDATE_SECTION = gql`
  mutation updateSection(
    $_id: ID!
    $fields: [Field2Input]
    $values: [FieldValue2Input]
    $options: AWSJSON
  ) {
    updateSection(_id: $_id, fields: $fields, values: $values, options: $options) {
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
