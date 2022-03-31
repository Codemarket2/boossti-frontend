// import Templates from '../components/template/Templates';
import UserLayout from '../components/common/UserLayout';
import { FormPage } from './HomeScreen-new';

export default function TypesScreen() {
  return (
    <UserLayout authRequired>
      {/* <Templates /> */}
      <FormPage slug="template" settings={{ formView: 'button', buttonLabel: 'Add New' }} />
    </UserLayout>
  );
}
