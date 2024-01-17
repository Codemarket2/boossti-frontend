import UserLayout from '../../src/components/common/UserLayout';
import NewForm from '../../src/components/form2/NewForm';

export default function NewFormPage() {
  return (
    <UserLayout authRequired>
      <NewForm isWorkflow />
    </UserLayout>
  );
}
