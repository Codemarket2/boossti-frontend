import SignInForm from '../SignInForm';
import { customMount } from '../../../../cypress/utils/mount';

describe('SignIn Form', () => {
  it('renders SignIn Form', () => {
    customMount(SignInForm);
    cy.get('[data-testid=signin-form]').within(() => {
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
    });
    cy.get('[data-testid=signin-button]').should('contain', 'Sign In');
    cy.get('[data-testid=forget-password-text]').should('contain', 'Lost your password?');
  });
});
