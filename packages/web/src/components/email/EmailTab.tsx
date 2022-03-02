import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import EmailForm from './EmailForm';
import EmailCard from './EmailCard';

const StyledPaper = styled(Paper)`
  margin-top: 20px !important;
`;
export default function EmailTab() {
  const [options, setOptions] = useState({
    currentTab: 'email',
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
          <Tab label="Email" value="email" />
          <Tab label="Send Email" value="sendEmail" />
        </Tabs>
      </StyledPaper>
      {options.currentTab === 'email' && (
        <Paper variant="outlined" className="px-2">
          <EmailForm />
        </Paper>
      )}
      {options.currentTab === 'sendEmail' && <EmailCard />}
    </div>
  );
}
