import SignUpForm from '../SignUpForm';
import { customMount } from '../../../../cypress/utils/mount';

describe('SignUp Form', () => {
  it('renders SignUp Form', () => {
    customMount(SignUpForm);
    cy.get('[data-testid=signup-form]').within(() => {
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
    });
    cy.get('[data-testid=signup-button]').should('contain', 'Sign Up');
  });
});
