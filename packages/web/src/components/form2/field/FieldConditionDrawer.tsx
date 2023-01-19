/* eslint-disable radix */
import Drawer from '@mui/material/Drawer';
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

interface IProps {
  onClose: () => void;
  open: boolean;
  field: IField;
  handleConditionChange: (fieldId: string, options_: any) => void;
}

export default function FieldConditionDrawer({
  open,
  onClose,
  field,
  handleConditionChange,
}: IProps) {
  const handelChange = (fieldId, params, permission) => {
    let options = {};
    // console.log('params', params);
    if (params[0]?.left?.formId === 'auth' && params[0]?.conditionType && params[0]?.right?.value) {
      options = { hidden: true, hiddenConditions: params, permission };
    }
    handleConditionChange(fieldId, options);
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
        <FieldConditionForm
          field={field}
          conditions={field?.options?.hiddenConditions}
          /* eslint-disable-next-line  */
          onConditionsChange={(param, permission) => handelChange(field?._id, param, permission)}
          onCancel={() => {
            onClose();
          }}
        />
      </div>
    </Drawer>
  );
}
