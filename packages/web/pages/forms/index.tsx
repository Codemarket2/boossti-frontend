import FormList from '../../src/components/form2/FormList';
import UserLayout from '../../src/components/common/UserLayout';

export default function Form(): any {
  return (
    <UserLayout authRequired>
      <FormList />
    </UserLayout>
  );
}
