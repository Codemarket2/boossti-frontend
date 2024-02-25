import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';

import CatFriends from './ManipulatingDOMwithrefs';

export default function Form(): any {
  // case 'reactgridlayout':

  return (
    <UserLayout authRequired>
      <CatFriends />
    </UserLayout>
  );

  //  return (
  // <UserLayout authRequired>
  //  <Thinking />
  // </UserLayout>
  // );
}
