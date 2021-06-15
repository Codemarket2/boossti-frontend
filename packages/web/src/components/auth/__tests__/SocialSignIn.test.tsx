import React from 'react';
import { mount } from '@cypress/react';
import SocialSignIn from '../SocialSignIn';

describe('Social SignIn', () => {
  it('renders Social SignIn', () => {
    mount(<SocialSignIn />);
    cy.get('[data-testid=google-signin-button]').should('exist');
    cy.get('[data-testid=facebook-signin-button]').should('exist');
  });
});
