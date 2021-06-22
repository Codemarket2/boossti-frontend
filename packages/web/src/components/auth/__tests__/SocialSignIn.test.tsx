import React from 'react';
import { customMount } from '../../../../cypress/utils/mount';
import SocialSignIn from '../SocialSignIn';

describe('Social SignIn', () => {
  it('renders Social SignIn', () => {
    customMount(SocialSignIn);
    cy.get('[data-testid=google-signin-button]').should('exist');
    cy.get('[data-testid=facebook-signin-button]').should('exist');
  });
});
