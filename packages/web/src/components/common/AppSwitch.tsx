import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';

export default function AppSwitch() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
  );
}
