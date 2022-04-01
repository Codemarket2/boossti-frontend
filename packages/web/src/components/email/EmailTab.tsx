import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import EmailForm from './EmailForm';
import EmailCard from './EmailCard';

export default function EmailTab() {
  const [options, setOptions] = useState({
    currentTab: 'email',
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
          <Tab label="Email" value="email" />
          <Tab label="Send Email" value="sendEmail" />
        </Tabs>
      </Paper>
      {options.currentTab === 'email' && (
        <Paper variant="outlined" className="px-2">
          <EmailForm />
        </Paper>
      )}
      {options.currentTab === 'sendEmail' && <EmailCard />}
    </div>
  );
}
