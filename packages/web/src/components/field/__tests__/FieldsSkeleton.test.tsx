import FieldsSkeleton from '../FieldsSkeleton';
import { customMount } from '../../../../cypress/utils/mount';

describe('FieldsSkeleton component', () => {
  it('Render FieldsSkeleton component', () => {
    customMount(FieldsSkeleton);
    cy.get('*[class^="MuiPaper-root"]').should('exist');
  });
});
