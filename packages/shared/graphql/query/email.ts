import { gql } from '@apollo/client';

export const GET_ALL_EMAILS = gql`
  query MyQuery {
    getAllEmails {
      count
      data {
        _id
        receiverEmail
        senderEmail
        subject
        body
      }
    }
  }
`;
