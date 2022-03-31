import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

import MailingListTab from './MailingListTab';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

export default function ContactTab() {
  const [options, setOptions] = useState({
    currentTab: 'contact',
  });

  return (
    <div>
      <Paper variant="outlined" className="mt-4">
        <Tabs
          variant="scrollable"
          value={options.currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => setOptions({ ...options, currentTab: newValue })}
        >
          <Tab label="Contacts" value="contact" />
          <Tab label="Mailing List" value="mailingList" />
        </Tabs>
      </Paper>
      {options.currentTab === 'contact' && (
        <Paper variant="outlined" className="px-2">
          <ContactForm />
          <ContactList />
        </Paper>
      )}
      {options.currentTab === 'mailingList' && <MailingListTab />}
    </div>
  );
}
