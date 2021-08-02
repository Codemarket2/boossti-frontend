import ImageList, { Media } from '../ImageList';
import { customMount } from '../../../../cypress/utils/mount';

const props = {
  media: [
    {
      url: 'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
      caption: 'Hello Guys',
    },
  ],
};

const props2 = {
  url: 'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
  caption: 'Hello Guys',
  isVideo: false,
  showIcon: false,
  onClick: () => {},
  onCaptionChange: () => {},
  authenticated: true,
};

describe('ImageList', () => {
  it('renders ImageList', () => {
    customMount(ImageList, props);
    cy.get('[data-testid=media]').should('have.length', props.media.length);
  });

  it('renders ImageList img Media', () => {
    customMount(Media, props2);
    cy.get('[data-testid=media]').find('img').should('have.attr', 'src', props2.url);
    cy.get('[data-testid=mention-parser]').contains(props2.caption);
  });

  it('renders ImageList video Media', () => {
    customMount(Media, { ...props2, isVideo: true });
    cy.get('[data-testid=media]')
      .find('video')
      .should('have.attr', 'src', props2.url + '#t=0.9');
    cy.get('[data-testid=mention-parser]').contains(props2.caption);
  });
});
