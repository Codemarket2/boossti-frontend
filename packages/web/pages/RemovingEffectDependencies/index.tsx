import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';

import RED from './RemovingEffectDependencies';

export default function Form(): any {
  // case 'reactgridlayout':

  return (
    <UserLayout authRequired>
      <RED />
    </UserLayout>
  );

  //  return (
  // <UserLayout authRequired>
  //  <Thinking />
  // </UserLayout>
  // );
}
