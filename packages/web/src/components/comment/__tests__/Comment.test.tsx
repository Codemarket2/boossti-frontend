import Comment from '../Comment';
import { customMount } from '../../../../cypress/utils/mount';
describe('Comment', () => {
  it('Renders Comment', () => {
    customMount(Comment);
  });
});
