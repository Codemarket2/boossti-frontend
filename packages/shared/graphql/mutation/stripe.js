import { gql } from '@apollo/client';

const CREATE_SUBSCRIPTION = gql`
  mutation MyMutation($userId: String!, $priceId: String!) {
    stripeCreateSubscription(userId: $userId, priceId: $priceId) {
      clientSecret
      subscriptionId
    }
  }
`;

export default {
  CREATE_SUBSCRIPTION,
};
