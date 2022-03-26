import UserLayout from '../../src/components/common/UserLayout';
import CustomMui from '../../src/components/customMUI/CustomMui';

export default function Form(): any {
  return (
    <UserLayout authRequired>
      <CustomMui />
    </UserLayout>
  );
}
