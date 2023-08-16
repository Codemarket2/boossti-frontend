import { gql } from '@apollo/client';

export const GET_LOGO_OR_DESCRIPTION = gql`
  query MyQuery($_id: ID) {
    getLogoOrDescription(_id: $_id) {
      _id
      description
      logo
    }
  }
`;
