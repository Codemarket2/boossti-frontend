import { useRouter } from 'next/router';
import React from 'react';
import Loading from '../../src/components/common/Loading';
import UserLayout from '../../src/components/common/UserLayout';
import TemplateScreen from '../../src/screens/TemplateScreen';

export default function preview() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <UserLayout authRequired>
      {slug ? <TemplateScreen slug={slug.toString()} preview /> : <Loading />}
    </UserLayout>
  );
}
