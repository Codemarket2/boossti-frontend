import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import InputGroup from '../common/InputGroup';

interface IProps {
  open: boolean;
  edge: any;
  onEdgeChange: (newDate: any) => void;
  onClose: () => void;
}

export default function EditEdge({ open, edge, onEdgeChange, onClose }: IProps) {
  const [state, setState] = useState(edge);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Edge</DialogTitle>
      <DialogContent dividers>
        <div style={{ minWidth: 300 }}>
          <InputGroup>
            <TextField
              size="small"
              label="label"
              fullWidth
              value={state?.data?.label}
              onChange={({ target }) =>
                setState({ ...state, data: { ...state?.data, label: target?.value } })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Color</InputLabel>
            <input
              type="color"
              value={state?.style?.stroke}
              onChange={({ target }) => {
                setState({
                  ...state,
                  style: { ...state?.style, stroke: target.value },
                  markerEnd: { type: 'arrowclosed', color: target.value },
                });
              }}
            />
          </InputGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state?.animated}
                onChange={({ target }) =>
                  setState({
                    ...state,
                    animated: target?.checked,
                  })
                }
              />
            }
            label="animated"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onEdgeChange(state)} variant="contained" size="small">
          Save
        </Button>
        <Button onClick={onClose} variant="outlined" size="small">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
