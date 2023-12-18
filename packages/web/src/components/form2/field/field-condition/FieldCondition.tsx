import { ICondition, IField } from '@frontend/shared/types/form';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import DisplayFieldCondition from './DisplayFieldCondition';
import FieldConditionForm from './FieldConditionForm';

interface FieldConditionProps {
  formFields: IField[];
  field: IField;
  onConditionsChange: (newConditions: ICondition[]) => void;
}

const initialState = { showForm: false };

export default function FieldCondition({
  formFields,
  field,
  onConditionsChange,
}: FieldConditionProps) {
  const [state, setState] = useState(initialState);
  return (
    <div className="mb-3">
      {!state.showForm && (
        <>
          {!(field?.options?.conditions?.length > 0) ? (
            <Button
              size="small"
              startIcon={<Add />}
              onClick={() => setState({ ...state, showForm: true })}
            >
              Add Condition
            </Button>
          ) : (
            <>
              <Typography>
                Condition
                <IconButton size="small" onClick={() => setState({ ...state, showForm: true })}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small" onClick={() => onConditionsChange(null)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Typography>
              <DisplayFieldCondition
                conditions={field?.options?.conditions}
                formFields={formFields}
              />
            </>
          )}
        </>
      )}
      {state.showForm && (
        <FieldConditionForm
          formFields={formFields}
          field={field}
          conditions={field?.options?.conditions}
          onConditionsChange={onConditionsChange}
          onCancel={() => setState(initialState)}
        />
      )}
    </div>
  );
}
