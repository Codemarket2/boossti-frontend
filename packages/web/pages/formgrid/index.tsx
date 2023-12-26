import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import UserLayout from '../../src/components/common/UserLayout';
import EmailTab from '../../src/components/email/EmailTab';
import FormGrid from './formgrid';

export default function Form(): any {
  // case 'reactgridlayout':

  return (
    <UserLayout authRequired>
      {/* <DragFromOutsideLayout /> */}
      <FormGrid />
    </UserLayout>
  );

  //  return (
  // <UserLayout authRequired>
  //  <Thinking />
  // </UserLayout>
  // );
}
