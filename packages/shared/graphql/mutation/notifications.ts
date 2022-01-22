import { gql } from '@apollo/client';

export const IS_NOTIFICATION_CLICKED = gql`
  mutation MyMutation($_id: ID!) {
    setIsClicked(_id: $_id)
  }
`;
