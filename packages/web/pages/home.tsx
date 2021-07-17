import React from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayout from '../src/components/common/UserLayout';
import FeedsScreen from '../src/screens/FeedsScreen';

export default function Page() {
  return (
    <UserLayout authRequired>
      <Typography variant="h4">Feeds</Typography>
      <FeedsScreen />
    </UserLayout>
  );
}
