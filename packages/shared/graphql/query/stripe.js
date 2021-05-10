import { gql } from '@apollo/client';

export const Stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

export const LIST_PRICES = gql`
  query MyQuery {
    stripeListPrices {
      active
      lookup_key
      billing_scheme
      created
      currency
      id
      livemode
      metadata
      object
      nickname
      tiers_mode
      transform_quantity
      type
      unit_amount
      unit_amount_decimal
      product {
        active
        attributes
        created
        description
        id
        images
        livemode
        metadata
        name
        object
        package_dimensions
        shippable
        url
        updated
        unit_label
        type
        statement_descriptor
      }
      recurring {
        interval
        aggregate_usage
        interval_count
        usage_type
      }
    }
  }
`;

export default {
  LIST_PRICES,
};
