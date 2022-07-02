import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import SelectFormFields from '../form2/SelectFormFields';

interface IProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  onSave: (args: { fieldId: string; fieldLabel: string; formName: string }) => void;
}

export default function EditShape({ open, onClose, formId, onSave }: IProps) {
  const [state, setState] = useState({ fieldId: '', fieldLabel: '', formName: '' });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit shape</DialogTitle>
      <DialogContent>
        <div style={{ minWidth: '250px' }} className="pt-2">
          <SelectFormFields
            value={state.fieldId}
            formId={formId}
            onChange={(fieldId, fieldLabel, formName) =>
              setState({ ...state, fieldId, fieldLabel, formName })
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={!state.fieldId} onClick={() => onSave(state)} variant="contained">
          Save
        </Button>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
