import FieldValueForm from '../FieldValueForm';
import { customMount } from '../../../../cypress/utils/mount';

describe('FieldValueForm component', () => {
  it('Render FieldValueForm component', () => {
    customMount(FieldValueForm);
    cy.get('input[name="value"]').should('exist');
    cy.get('input[name="value"]').type('developer');
    cy.get('[data-testid=cancel-button').should('exist');
    cy.get('[data-testid=cancel-button').click();
    cy.get('[data-testid=save-button').should('exist');
    cy.get('[data-testid=save-button').click();
  });
});
