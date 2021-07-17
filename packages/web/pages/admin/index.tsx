import React from 'react';
import AdminLayout from '../../src/components/admin/AdminLayout';
import UsersList from '../../src/components/user/UsersList';

export default function Page() {
  return (
    <AdminLayout>
      <UsersList />
    </AdminLayout>
  );
}
