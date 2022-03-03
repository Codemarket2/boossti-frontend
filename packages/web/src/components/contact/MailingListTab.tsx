import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import BulkInput from './BulkInput';

const StyledPaper = styled(Paper)`
  margin-top: 20px !important;
`;

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
