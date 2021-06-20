import React from 'react';
import UserLayout from '../src/components/common/UserLayout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

export default function HomePage() {
  const router = useRouter();
  const { initial, authenticated } = useSelector(({ auth }: any) => auth);

  if (initial && !authenticated) {
    router.push('/auth');
  }

  return (
    <UserLayout authRequired>
      <Typography variant="h4">Inbox</Typography>
    </UserLayout>
  );
}
