import { gql } from '@apollo/client';

export const CREATE_SEND_EMAIL = gql`
  mutation MyMutation(
    $body: String!
    $senderEmail: String!
    $subject: String!
    $receiverEmail: [String]
    $mailingList: String
  ) {
    createSendEmail(
      body: $body
      senderEmail: $senderEmail
      subject: $subject
      receiverEmail: $receiverEmail
      mailingList: $mailingList
    ) {
      _id
      body
      receiverEmail
      subject
      senderEmail
    }
  }
`;

export const CREATE_MAILING_LIST = gql`
  mutation MyMutation($fileUrl: String!, $collectionName: String!, $map: AWSJSON!) {
    createMailingList(fileUrl: $fileUrl, collectionName: $collectionName, map: $map)
  }
`;
