import { gql } from '@apollo/client';

export const GET_ALL_CONTACTS = gql`
  query MyQuery($page: Int, $limit: Int) {
    getAllContacts(page: $page, limit: $limit) {
      count
      data {
        _id
        firstName
        lastName
        title
        businessName
        email
        phone
        groupName
        website
        city
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CONTACT = gql`
  query MyQuery($_id: ID!) {
    getContact(_id: $_id) {
      _id
      parentId {
        _id
        title
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
      createdBy {
        _id
        picture
        name
      }
      createdAt
    }
  }
`;

export const GET_ALL_MAILING_LIST = gql`
  query MyQuery($page: Int, $limit: Int) {
    getAllMailingList(page: $page, limit: $limit) {
      contacts
      listName
    }
  }
`;
