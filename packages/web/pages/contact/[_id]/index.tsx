import React from 'react';
import { useRouter } from 'next/router';
import UserLayout from '../../../src/components/common/UserLayout';
import ErrorLoading from '../../../src/components/common/ErrorLoading';
import ContactProfile from '../../../src/components/contact/ContactProfile';

export default function index() {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <UserLayout container={false} authRequired>
      {_id ? <ContactProfile _id={_id?.toString()} /> : <ErrorLoading />}
    </UserLayout>
  );
}
