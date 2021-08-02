import PostCard from '../PostCard';
import { customMount } from '../../../../cypress/utils/mount';

const props = {
  authenticated: true,
  post: {
    body: 'hello guys',
    media: [
      {
        url:
          'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
        caption: '',
      },
    ],
    createdBy: {
      _id: '12345',
      name: 'Vivek',
      picture:
        'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
    },
  },
};

describe('PostCard', () => {
  it('renders PostCard', () => {
    customMount(PostCard, props);
    cy.get('[data-testid=author-name]').should('contain', props.post.createdBy.name);
    cy.get('[data-testid=author-picture]')
      .find('img')
      .should('have.attr', 'src', props.post.createdBy.picture)
      .and('have.attr', 'alt', props.post.createdBy.name);
    cy.get('[data-testid=post-body]')
      .find('[data-testid=mention-parser]')
      .should('contain', props.post.body);
    cy.get('[data-testid=post-timestamp]').should('exist');
    cy.get('[data-testid=media]').should('have.length', props.post.media.length);
  });
});
