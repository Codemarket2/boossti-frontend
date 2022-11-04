import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import { systemForms } from '@frontend/shared/utils/systemForms';
import UserLayout from '../../src/components/common/UserLayout';

export default function FeedPage() {
  return (
    <UserLayout container={false} authRequired feedLayout>
      {null}
    </UserLayout>
  );
}
