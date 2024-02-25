import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';

import REffect from './ReactiveEffects';

export default function Form(): any {
  // case 'reactgridlayout':

  return (
    <UserLayout authRequired>
      <REffect />
    </UserLayout>
  );

  //  return (
  // <UserLayout authRequired>
  //  <Thinking />
  // </UserLayout>
  // );
}
