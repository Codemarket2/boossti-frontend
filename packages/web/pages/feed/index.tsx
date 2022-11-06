import { Typography } from '@mui/material';
import AuditLog from '../../src/components/auditLog/AuditLog';
import BreadcrumbsComponent from '../../src/components/common/Breadcrumbs';
import UserLayout from '../../src/components/common/UserLayout';

export default function FeedPage() {
  return (
    <UserLayout container={false} authRequired feedLayout>
      <BreadcrumbsComponent>
        <Typography>Feed</Typography>
      </BreadcrumbsComponent>
      <AuditLog />
    </UserLayout>
  );
}
