import FieldValueForm2 from '../FieldValueForm2';
import { customMount } from '../../../../cypress/utils/mount';

describe('FieldValueForm2 component', () => {
  it('Render FieldValueForm2 component', () => {
    customMount(FieldValueForm2);
    cy.get('input[name="value"]').should('exist');
  });
});
