import { IField } from '@frontend/shared/types/form';
import { IValue } from '@frontend/shared/types/response';
import Add from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Field from '../Field';

interface DefaultValueProps {
  field: IField;
  onDefaultValueChange: (defaultValue: IValue) => void;
}

export default function DefaultValue({ field, onDefaultValueChange }: DefaultValueProps) {
  const [showField, setShowField] = useState(false);
  return (
    <div>
      {showField || field?.options?.defaultValue ? (
        <Field
          {...field}
          validate
          value={field?.options?.defaultValue}
          onChangeValue={(value) => {
            onDefaultValueChange(value);
          }}
        />
      ) : (
        <Button size="small" startIcon={<Add />} onClick={() => setShowField(true)}>
          Add default value
        </Button>
      )}
    </div>
  );
}
