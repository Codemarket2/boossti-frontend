import UserLayout from '../../src/components/common/UserLayout';
import EmailTab from '../../src/components/email/EmailTab';

export default function Form(): any {
  return (
    <UserLayout authRequired>
      <EmailTab />
    </UserLayout>
  );
}
