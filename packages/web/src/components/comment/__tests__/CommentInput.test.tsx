import CommentInput from '../CommentInput';
import { customMount } from '../../../../cypress/utils/mount';

describe('CommentInput', () => {
  it('Renders CommentInput', () => {
    customMount(CommentInput);
    cy.get('input[name="comment"]').should('exist');
    cy.get('[data-testid=add-comment]').should('exist');
  });
  it('Input Events', () => {
    customMount(CommentInput);
    cy.get('input[name="comment"]').type('test test test');
    cy.get('[data-testid=add-comment]').click();
  });
});
