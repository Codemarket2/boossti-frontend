import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation MyMutation(
    $firstName: String
    $lastName: String
    $title: String
    $businessName: String
    $email: String!
    $phone: String
    $groupName: String!
    $website: String
    $city: String
  ) {
    createContact(
      firstName: $firstName
      lastName: $lastName
      title: $title
      businessName: $businessName
      email: $email
      phone: $phone
      groupName: $groupName
      website: $website
      city: $city
    ) {
      _id
      businessName
      city
      createdAt
      email
      firstName
      groupName
      lastName
      phone
      title
      updatedAt
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation MyMutation($_id: ID!, $values: [FieldValue2Input]) {
    updateContact(_id: $_id, values: $values) {
      _id
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
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation MyMutation($_id: ID!) {
    deleteContact(_id: $_id)
  }
`;

export const CREATE_MAILING_LIST_FROM_CONTACT = gql`
  mutation MyMutation($listName: String!, $selectedContact: [ID!]!) {
    createMailingListFromContact(listName: $listName, selectedContact: $selectedContact)
  }
`;
