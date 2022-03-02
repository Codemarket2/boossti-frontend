import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import MailingListTab from './MailingListTab';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

const StyledPaper = styled(Paper)`
  margin-top: 20px !important;
`;

export default function ContactTab() {
  const [options, setOptions] = useState({
    currentTab: 'contact',
  });

  return (
    <div>
      <StyledPaper variant="outlined">
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
      </StyledPaper>
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
