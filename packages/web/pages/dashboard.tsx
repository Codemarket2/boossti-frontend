import React from 'react';
import DashboardScreen from '../src/screens/DashboardScreen';
import UserLayout from '../src/components/common/UserLayout';

export default function Dashboard() {
  return (
    <UserLayout authRequired redirectPath="dashboard">
      <DashboardScreen />
    </UserLayout>
  );
}
