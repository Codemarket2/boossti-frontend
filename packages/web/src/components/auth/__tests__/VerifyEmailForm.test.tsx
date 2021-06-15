import VerifyEmailForm from '../VerifyEmailForm';
import { customMount } from '../../../../cypress/utils/mount';

describe('Verify Email Form', () => {
  it('renders Verify Email Form', () => {
    customMount(VerifyEmailForm);
    cy.get('[data-testid=verify-email-form]').within(() => {
      cy.get('input[name="code"]').should('exist');
    });
    cy.get('[data-testid=verify-button]').should('contain', 'Verify');
  });
});
