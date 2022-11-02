import { useGetForm } from '@frontend/shared/hooks/form';
import { IConditionPart, ICondition, IField, IForm } from '@frontend/shared/types/form';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import FormHelperText from '@mui/material/FormHelperText';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { IResponse } from '@frontend/shared/types';
import { useGetResponse } from '@frontend/shared/hooks/response';
import InputGroup from '../../../common/InputGroup';
import SelectFormFields from '../../SelectFormFields';
import { getFieldCondition } from './DisplayFieldCondition';
import SelectForm from '../../SelectForm';
import ErrorLoading from '../../../common/ErrorLoading';
import SelectResponse from '../../../response/SelectResponse';
import { SelectSubField } from './FieldConditionForm';

interface IConditionPartProps {
  conditionPart: any;
  onConditionPartChange: (conditionPart: any) => void;
}

export default function ConditionPart({
  conditionPart,
  onConditionPartChange,
}: IConditionPartProps) {
  const [formNames, setFormNames] = useState({ left: '', right: '' });
  const { data } = useGetForm(conditionPart?.formId);
  const form = data?.getForm;
  return (
    <div>
      <InputGroup>
        <FormControl size="small" fullWidth error={!conditionPart}>
          <InputLabel>Value</InputLabel>
          <Select
            value={conditionPart?.value}
            label="Value"
            onChange={({ target }) =>
              onConditionPartChange({ ...conditionPart, value: target.value })
            }
          >
            <MenuItem value="constantValue">Constant Value</MenuItem>
            <MenuItem value="form">Form</MenuItem>
            <MenuItem value="null">null</MenuItem>
            <ListSubheader>Global state (logged in User)</ListSubheader>
            <MenuItem value="auth._id">auth._id</MenuItem>
            <MenuItem value="auth.email">auth.email</MenuItem>
            <MenuItem value="auth.name">auth.name</MenuItem>
            <ListSubheader>Boolean</ListSubheader>
            <MenuItem value="true">true</MenuItem>
            <MenuItem value="false">false</MenuItem>
            {/* {formFields?.length > 0 && <ListSubheader>Form fields</ListSubheader>} */}
            {/* {formFields
              ?.filter((formField) => formField?._id !== field?._id)
              ?.map((formField) => (
                <MenuItem value={formField?._id} key={formField?._id}>
                  {formField?.label}
                </MenuItem>
              ))} */}
          </Select>
          {!conditionPart?.value && <FormHelperText>Required</FormHelperText>}
        </FormControl>
      </InputGroup>
      {conditionPart?.value === 'constantValue' && (
        <InputGroup>
          <TextField
            fullWidth
            label="Constant Value"
            size="small"
            value={conditionPart?.constantValue}
            onChange={({ target }) =>
              onConditionPartChange({ ...conditionPart, constantValue: target.value })
            }
            error={!conditionPart?.constantValue}
            helperText={!conditionPart?.constantValue && 'Required'}
          />
        </InputGroup>
      )}
      {conditionPart?.value === 'form' && (
        <>
          <InputGroup>
            <SelectForm
              value={
                conditionPart?.formId
                  ? { _id: conditionPart?.formId, name: form?.name || formNames?.right }
                  : null
              }
              onChange={(from) => {
                const payload = { ...conditionPart, formId: from?._id };
                if (conditionPart?.formId !== from?._id) {
                  payload.fieldId = null;
                  payload.responseId = null;
                  payload.subField = null;
                }
                onConditionPartChange(payload);
                setFormNames({ ...formNames, right: from?.name });
              }}
              error={!conditionPart?.formId}
              helperText={!conditionPart?.formId && 'Required'}
            />
          </InputGroup>
          {conditionPart?.formId && (
            <SelectSubField
              selectResponse
              subField={conditionPart}
              onChange={(newPart) => onConditionPartChange({ ...conditionPart, ...newPart })}
            />
          )}
        </>
      )}
    </div>
  );
}
