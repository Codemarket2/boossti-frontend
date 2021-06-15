import ForgetPasswordForm from '../ForgetPasswordForm';
import { customMount } from '../../../../cypress/utils/mount';

describe('Forget Password Form', () => {
  it('renders Forget Password Form', () => {
    customMount(ForgetPasswordForm);
    cy.get('[data-testid=forget-password-form]').within(() => {
      cy.get('input[name="email"]').should('exist');
    });
    cy.get('[data-testid=reset-code-button]').should('contain', 'Get Password Reset Code');
    cy.get('[data-testid=cancel-button]').should('contain', 'Cancel');
  });
});
