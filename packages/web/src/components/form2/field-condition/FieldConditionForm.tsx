import { useGetForm } from '@frontend/shared/hooks/form';
import { ICondition, IField } from '@frontend/shared/types/form';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import ErrorLoading from '../../common/ErrorLoading';
import InputGroup from '../../common/InputGroup';
import SelectFormFields from '../SelectFormFields';
import { getFieldCondition } from './DisplayFieldCondition';

interface ConditionFormProps {
  formFields: IField[];
  field: IField;
  onConditionsChange: (newConditions: ICondition[]) => void;
  onCancel: () => void;
}

const ConditionForm = ({ formFields, field, onCancel, onConditionsChange }: ConditionFormProps) => {
  const [conditions, setConditions] = useState<ICondition[]>(
    field?.options?.conditions || [defaultCondition],
  );
  const { data, error } = useGetForm(field?.form?._id);
  const onChange = (conditionIndex, condition: Partial<ICondition>) => {
    setConditions(conditions?.map((c, i) => (i === conditionIndex ? { ...c, ...condition } : c)));
  };
  const deleteCondition = (conditionIndex) => {
    setConditions(conditions?.filter((c, i) => i === conditionIndex));
  };

  const handleSave = () => {
    onConditionsChange(conditions);
    onCancel();
  };

  if (!data || error) {
    return (
      <ErrorLoading error={error}>
        <Skeleton height={50} />;
      </ErrorLoading>
    );
  }

  return (
    <div>
      <Typography>Edit Condition</Typography>
      {getFieldCondition(conditions, formFields, data?.getForm?.fields)}
      <div className="pl-3">
        {conditions?.map((condition, conditionIndex) => (
          <div>
            {conditionIndex !== 0 && (
              <InputGroup>
                <div className="d-flex align-items-center">
                  <FormControl size="small" fullWidth>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={condition?.operator}
                      label="Operator"
                      onChange={({ target }: any) =>
                        onChange(conditionIndex, { operator: target.value })
                      }
                    >
                      <MenuItem value="AND">AND ( && )</MenuItem>
                      <MenuItem value="OR">OR ( || )</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    edge="end"
                    size="small"
                    color="error"
                    onClick={() => deleteCondition(conditionIndex)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </InputGroup>
            )}
            <InputGroup>
              <SelectFormFields
                formId={field?.form?._id}
                value={condition?.fieldId}
                onChange={(fieldId) => onChange(conditionIndex, { fieldId })}
              />
            </InputGroup>
            <InputGroup>
              <FormControl size="small" fullWidth>
                <InputLabel>Condition Type</InputLabel>
                <Select
                  value={condition?.conditionType}
                  label="Condition Type"
                  onChange={({ target }: any) =>
                    onChange(conditionIndex, { conditionType: target.value })
                  }
                >
                  <MenuItem value="==">is Equal to</MenuItem>
                  <MenuItem value="!=">is Not Equal to</MenuItem>
                </Select>
              </FormControl>
            </InputGroup>
            <InputGroup>
              <FormControl size="small" fullWidth>
                <InputLabel>Value</InputLabel>
                <Select
                  value={condition?.value}
                  label="Value"
                  onChange={({ target }) => onChange(conditionIndex, { value: target.value })}
                >
                  <MenuItem value="constantValue">Constant Value</MenuItem>
                  {formFields
                    ?.filter((formField) => formField?._id !== field?._id)
                    ?.map((formField) => (
                      <MenuItem value={formField?._id} key={formField?._id}>
                        {formField?.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </InputGroup>
            {condition?.value === 'constantValue' && (
              <InputGroup>
                <TextField
                  fullWidth
                  label="Constant Value"
                  size="small"
                  value={condition?.constantValue}
                  onChange={({ target }) =>
                    onChange(conditionIndex, { constantValue: target.value })
                  }
                />
              </InputGroup>
            )}
          </div>
        ))}
        {conditions[conditions?.length - 1]?.value && (
          <Button
            size="small"
            onClick={() => setConditions([...conditions, defaultCondition])}
            startIcon={<Add />}
          >
            Add More Condition
          </Button>
        )}
        <InputGroup>
          <Button size="small" variant="contained" onClick={handleSave}>
            Save Condition
          </Button>
          <Button className="m-2" size="small" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

const defaultCondition: ICondition = {
  operator: null,
  fieldId: '',
  conditionType: null,
  value: '',
  constantValue: '',
};

export default ConditionForm;
