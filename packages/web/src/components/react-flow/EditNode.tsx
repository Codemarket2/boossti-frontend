import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Slider, Tooltip } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import Delete from '@mui/icons-material/Delete';
import { generateObjectId } from '@frontend/shared/utils/objectId';
import React, { useState } from 'react';
import InputGroup from '../common/InputGroup';
import RichTextarea2 from '../common/RichTextarea2';
import SelectFormFields from '../form2/SelectFormFields';

interface IProps {
  open: boolean;
  data: any;
  onChange: (newDate: any) => void;
  onClose: () => void;
}

interface IPort {
  _id: string;
  fieldId: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  type: 'source' | 'target';
  color: string;
  alignment: number;
}

export default function EditNode({ open, data, onChange, onClose }: IProps) {
  const [state, setState] = useState(data);

  const onPortChange = (portId: string, newPort: Partial<IPort>) => {
    let newPorts = state?.ports || [];
    let isNewPort = true;
    newPorts = newPorts?.map((port, i) => {
      if (port?._id === portId) {
        isNewPort = false;
        return { ...port, ...newPort };
      }
      return port;
    });
    if (isNewPort) {
      newPorts = [...newPorts, { ...newPort, _id: generateObjectId() }];
    }
    setState({ ...state, ports: newPorts });
  };

  const deletePort = (portId) => {
    if (portId) {
      setState({ ...state, ports: state?.ports?.filter((p) => p?._id !== portId) });
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit Node</DialogTitle>
      <DialogContent dividers>
        <div style={{ minWidth: 300 }}>
          <InputGroup>
            {state?.formId ? (
              <>
                <FormControl size="small" fullWidth variant="outlined" required>
                  <InputLabel id="demo-simple-select-standard-label">Form view</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={state.formView || 'formName'}
                    onChange={({ target }) => setState({ ...state, formView: target.value })}
                    label="Form view"
                  >
                    <MenuItem value="formName">Display form name</MenuItem>
                    <MenuItem value="fullForm">Display full form</MenuItem>
                    <MenuItem value="formField">Display form field</MenuItem>
                    <MenuItem value="formResponse">Display form response</MenuItem>
                  </Select>
                </FormControl>
                {state.formView === 'formField' && (
                  <InputGroup>
                    <SelectFormFields
                      formId={state?.formId}
                      value={state.fieldId}
                      onChange={(fieldId) => setState({ ...state, fieldId })}
                    />
                  </InputGroup>
                )}
              </>
            ) : (
              <>
                <RichTextarea2
                  value={state?.label || ''}
                  onChange={(newValue) => setState({ ...state, label: newValue })}
                />
              </>
            )}
          </InputGroup>
          <InputGroup>
            <InputLabel>Background color</InputLabel>
            <input
              type="color"
              value={state?.backgroundColor || '#ffffff'}
              onChange={({ target }) => setState({ ...state, backgroundColor: target.value })}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Text color</InputLabel>
            <input
              type="color"
              value={state?.color || '#000000'}
              onChange={({ target }) => setState({ ...state, color: target.value })}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>
              Ports
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  let ports = [];
                  if (state?.ports?.length) {
                    ports = state?.ports;
                  }
                  setState({ ...state, ports: [...ports, {}] });
                }}
              >
                <AddCircle fontSize="small" />
              </IconButton>
            </InputLabel>
            {state?.ports?.map((port, portIndex) => (
              <div key={port?._id}>
                <div className="py-2 d-flex align-items-center">
                  {portIndex + 1}.
                  <SelectFormFields
                    formId={state?.formId}
                    value={port?.fieldId}
                    onChange={(fieldId) => onPortChange(port?._id, { fieldId })}
                  />
                  <FormControl size="small" fullWidth>
                    <InputLabel>Position</InputLabel>
                    <Select
                      label="Position"
                      value={port?.position}
                      onChange={({ target }) =>
                        onPortChange(port?._id, { position: target?.value })
                      }
                    >
                      <MenuItem value="top">Top</MenuItem>
                      <MenuItem value="bottom">Bottom</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      value={port?.type}
                      onChange={({ target }) => onPortChange(port?._id, { type: target?.value })}
                    >
                      <MenuItem value="source">Source</MenuItem>
                      <MenuItem value="target">Target</MenuItem>
                    </Select>
                  </FormControl>
                  <Tooltip title="Port Color">
                    <input
                      type="color"
                      value={port?.color || '#5f5b5b'}
                      onChange={({ target }) => onPortChange(port?._id, { color: target?.value })}
                    />
                  </Tooltip>
                  <Tooltip title="Delete Port">
                    <IconButton color="error" size="small" onClick={() => deletePort(port?._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
                <Slider
                  defaultValue={50}
                  value={port?.alignment}
                  onChange={(event, newValue) => {
                    onPortChange(port?._id, {
                      alignment: newValue as number,
                    });
                  }}
                  step={5}
                  marks
                />
              </div>
            ))}
          </InputGroup>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onChange(state)} variant="contained" size="small">
          Save
        </Button>
        <Button onClick={onClose} variant="outlined" size="small">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
