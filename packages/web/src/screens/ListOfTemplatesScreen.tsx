import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import ErrorLoading from '../components/common/ErrorLoading';
import NotFound from '../components/common/NotFound';
import UserLayout from '../components/common/UserLayout';
import ResponseList from '../components/response/ResponseList';
import Templates from '../components/template/Templates';
import { FormPage } from './HomeScreen-new';

export default function TypesScreen() {
  return (
    <UserLayout authRequired>
      {/* <Templates /> */}
      <FormPage slug="template" settings={{ formView: 'button', buttonLabel: 'Add New' }} />
    </UserLayout>
  );
}
