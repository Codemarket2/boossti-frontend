/* eslint-disable radix */
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Refresh from '@mui/icons-material/Refresh';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ICondition, IField } from '@frontend/shared/types';
import InputGroup from '../../common/InputGroup';
import { defaultStyles } from '../../style/defaultStyles';
import FieldConditionForm from './field-condition/FieldConditionForm';
import SelectFormFields from '../SelectFormFields';

interface IProps {
  onClose: () => void;
  open: boolean;
  field: IField;
  formId: string;
  rulesCondition: ICondition[];
  moveToField: IField;
  onChange: (fieldID: string, rulesCondition: ICondition[], moveToField: IField) => void;
}

export default function FieldConditionDrawer({
  open,
  onClose,
  field,
  formId,
  onChange,
  rulesCondition,
  moveToField,
}: IProps) {
  const [state, setState] = useState({
    moveToField,
    rulesCondition,
  });
  const handleSave = () => {
    onChange(field?._id, state.rulesCondition, state.moveToField);
    onClose();
  };
  const onConditionsChange = (newCondition: ICondition[]) => {
    setState({ ...state, rulesCondition: newCondition });
  };

  return (
    <Drawer
      ModalProps={{ BackdropProps: { invisible: true } }}
      elevation={5}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <div style={{ minWidth: 300 }} className="p-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>Rules</span>
            {/* <IconButton onClick={handleResetStyle} size="small" edge="end">
              <Refresh />
            </IconButton> */}
          </div>
          <IconButton onClick={onClose} size="small" edge="end">
            <Close />
          </IconButton>
        </div>
        <span>If below Condition True </span>
        <FieldConditionForm
          field={field}
          conditions={state.rulesCondition}
          /* eslint-disable-next-line  */
          onConditionsChange={onConditionsChange}
          onCancel={null}
        />
        <span> Then move to</span>
        <br />
        <SelectFormFields
          formId={formId}
          value={state.moveToField}
          onChange={(newmoveToField) => {
            setState({ ...state, moveToField: newmoveToField });
          }}
        />
        <InputGroup>
          <Button size="small" variant="contained" onClick={handleSave}>
            Save Condition
          </Button>
          <Button className="m-2" size="small" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </InputGroup>
      </div>
    </Drawer>
  );
}
