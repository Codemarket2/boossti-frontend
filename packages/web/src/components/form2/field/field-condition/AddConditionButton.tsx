import { defaultConditionObject, ICondition } from '@frontend/shared/types';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import React from 'react';
import FieldConditionForm from './FieldConditionForm';

interface IAddConditionButton {
  conditions: ICondition[];
  onConditionsChange: (newConditions: ICondition[]) => void;
}

export default function AddConditionButton({
  conditions,
  onConditionsChange,
}: IAddConditionButton) {
  return (
    <div>
      <Button
        size="small"
        startIcon={conditions?.length > 0 ? <Delete /> : <Add />}
        color={conditions?.length > 0 ? 'error' : 'primary'}
        onClick={() => {
          if (conditions?.length > 0) {
            onConditionsChange(null);
          } else {
            onConditionsChange([defaultConditionObject]);
          }
        }}
      >
        {conditions?.length > 0 ? 'Delete Condition' : 'Add Condition'}
      </Button>
      {conditions?.length > 0 && (
        <FieldConditionForm conditions={conditions} onConditionsChange={onConditionsChange} />
      )}
    </div>
  );
}
