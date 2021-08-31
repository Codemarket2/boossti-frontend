import DisplayComment from '../DisplayComment';
import { customMount } from '../../../../cypress/utils/mount';

const props = {
  authenticated: true,
  index: 2,
  postId: '',
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
};

describe('DisplayCard', () => {
  it('Render DisplayCard', () => {
    customMount(DisplayComment, props);
  });
});
