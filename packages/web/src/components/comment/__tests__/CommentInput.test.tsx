import CommentInput from '../CommentInput';
import { customMount } from '../../../../cypress/utils/mount';

describe('CommentInput', () => {
  it('Renders CommentInput', () => {
    customMount(CommentInput);
    cy.get('[data-testid=add-comment]').should('exist');
  });
  it('Input Events', () => {
    customMount(CommentInput);
    cy.get('[data-testid=add-comment]').click();
  });
});
