import React from 'react';
import UserLayout from '../src/components/common/UserLayout';
import Typography from '@material-ui/core/Typography';

export default function Page() {
  return (
    <UserLayout authRequired>
      <Typography variant="h4">Calendar</Typography>
    </UserLayout>
  );
}
