import React from 'react';

import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/contact/ContactForm';
import ContactTab from '../components/contact/ContactTab';

export default function ContactScreen() {
  return (
    <UserLayout authRequired>
      <ContactTab />
    </UserLayout>
  );
}
