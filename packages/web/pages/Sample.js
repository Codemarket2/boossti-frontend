import React from 'react';
import UsersTabs from '../src/components/users/UsersTabs';
import UserLayout from '../src/components/common/UserLayout';

export default function Sample() {
  return (
    <UserLayout>
      <UsersTabs />
    </UserLayout>
  );
}
