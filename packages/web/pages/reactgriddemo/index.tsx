import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';
import EmailTab from '../../src/components/email/EmailTab';
import DragFromOutsideLayout from './reactgriddemo';

export default function Form(): any {
  // case 'reactgridlayout':

  return (
    <UserLayout authRequired>
      <DragFromOutsideLayout />
    </UserLayout>
  );

  //  return (
  // <UserLayout authRequired>
  //  <Thinking />
  // </UserLayout>
  // );
}
