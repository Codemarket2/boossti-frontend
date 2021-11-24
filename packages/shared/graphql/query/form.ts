import { gql } from '@apollo/client';

export const GET_FORM = gql`
  query MyQuery($_id: ID!) {
    getForm(_id: $_id) {
      _id
      parentId
      name
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
      settings
      published
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;

export const GET_FORMS = gql`
  query MyQuery($page: Int, $limit: Int, $search: String) {
    getForms(page: $page, limit: $limit, search: $search) {
      count
      data {
        _id
        # parentId
        name
        # fields {
        #   _id
        #   label
        #   fieldType
        #   options
        #   typeId {
        #     _id
        #     title
        #     slug
        #   }
        # }
        # settings
        # published
        createdBy {
          _id
          picture
          name
        }
        createdAt
      }
    }
  }
`;
