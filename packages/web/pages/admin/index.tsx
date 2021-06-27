import React from 'react';
import AdminLayout from '../../src/components/common/AdminLayout';
import UsersList from '../../src/components/user/UsersList';

export default function Page() {
  return (
    <AdminLayout>
      <UsersList />
    </AdminLayout>
  );
}
