import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';

import Stopwatch from './Usingref';

export default function Form(): any {
  // case 'reactgridlayout':

  return (
    <UserLayout authRequired>
      <Stopwatch />
    </UserLayout>
  );

  //  return (
  // <UserLayout authRequired>
  //  <Thinking />
  // </UserLayout>
  // );
}
