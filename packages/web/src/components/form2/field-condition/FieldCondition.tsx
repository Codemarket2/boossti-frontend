import { ICondition, IField } from '@frontend/shared/types/form';
import Add from '@mui/icons-material/Add';
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
              </Typography>
              <DisplayFieldCondition field={field} formFields={formFields} />
            </>
          )}
        </>
      )}
      {state.showForm && (
        <FieldConditionForm
          formFields={formFields}
          field={field}
          onConditionsChange={onConditionsChange}
          onCancel={() => setState(initialState)}
        />
      )}
    </div>
  );
}
