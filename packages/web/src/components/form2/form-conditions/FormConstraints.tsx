import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import ConstraintsTab from './ConstraintsTab';
import FlowDiagramTab from './FlowDiagramTab';

interface IProps {
  form: any;
  onConstraintsChange: (arg: any) => void;
  onFieldsChange: (fields: any) => void;
}

const initialState = {
  selectedTab: 0,
};

export default function FormConstraints({ form, onConstraintsChange, onFieldsChange }: IProps) {
  const [state, setState] = useState(initialState);

  return (
    <Paper variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={state.selectedTab}
          onChange={(e, selectedTab) => setState({ ...initialState, selectedTab })}
        >
          <Tab label="Constraints" />
          <Tab label="Flow Diagram" />
        </Tabs>
      </Box>
      {state.selectedTab === 0 && (
        <ConstraintsTab
          form={form}
          onConstraintsChange={onConstraintsChange}
          onFieldsChange={onFieldsChange}
        />
      )}
      {state.selectedTab === 1 && <FlowDiagramTab form={form} />}
    </Paper>
  );
}
