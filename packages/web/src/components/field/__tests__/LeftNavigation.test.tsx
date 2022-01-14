import SelectFormSection from '../SelectFormSection';
import { customMount } from '../../../../cypress/utils/mount';

describe('SelectFormSection component', () => {
  it('Render SelectFormSection component', () => {
    customMount(SelectFormSection);
  });
});
