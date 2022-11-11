import { gql } from '@apollo/client';

export const FEED_DELETE_SUB = gql`
  subscription MySubscription {
    feedDeleteSub
  }
`;
