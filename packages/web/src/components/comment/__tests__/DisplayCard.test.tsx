import DisplayCard from '../DisplayCard';
import { customMount } from '../../../../cypress/utils/mount';

const props = {
  index: 2,
  postId: 'dfdfsgffgssfgsfg',
  commentedUser: {
    _id: '6128bf20fc0de17f4ca2d791',
    body: 'comment',
    parentId: '6128bd0e3b68702db43026b9',
    createdBy: {
      _id: '12345',
      name: 'muzzamil',
      picture:
        'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
    },
  },

  handleDelete: () => {
    return;
  },
  setEdit: () => {
    return;
  },
  setReplyOnComment: () => {
    return;
  },
  showIcon: false,
};

describe('DisplayCard', () => {
  it('Render DisplayCard', () => {
    customMount(DisplayCard, props);
    cy.get('[ data-testid=author-profile]').should('exist');
    cy.get('[ data-testid=comment-body]').should('exist');
    cy.get('[ data-testid=created-timestamp]').should('exist');
    cy.get('[ data-testid=author-name]').should('exist');
  });
});
