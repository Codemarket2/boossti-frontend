import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import BulkInput from './BulkInput';

export default function MailingListTab() {
  const [options, setOptions] = useState({
    currentTab: 'mailingList',
  });

  return (
    <div>
      <Paper variant="outlined">
        <Tabs
          variant="scrollable"
          value={options.currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => setOptions({ ...options, currentTab: newValue })}
        >
          <Tab label="Add Mailing" value="addMailingList" />
          <Tab label="List of Mails" value="mailingList" />
        </Tabs>
      </Paper>
      {options.currentTab === 'addMailingList' && (
        <Paper variant="outlined" className="px-2">
          <BulkInput />
        </Paper>
      )}
      {options.currentTab === 'mailingList' && 'mailingList'}
    </div>
  );
}
