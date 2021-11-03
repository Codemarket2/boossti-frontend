import { gql } from '@apollo/client';
export const CREATE_LOGO_OR_DESCRIPTION = gql`
  mutation MyMutation($description: String, $logo: String) {
    createLogoOrDescription(description: $description, logo: $logo) {
      _id
      description
      logo
    }
  }
`;
export const UPDATE_LOGO_OR_DESCRIPTION = gql`
  mutation MyMutation($_id: ID, $description: String, $logo: String) {
    updateLogoOrDescription(_id: $_id, description: $description, logo: $logo) {
      _id
      description
      logo
    }
  }
`;

export const DELETE_LOGO_OR_DESCRIPTION = gql`
  mutation MyMutation($_id: ID!) {
    deleteLogoOrDescription(_id: $_id)
  }
`;
