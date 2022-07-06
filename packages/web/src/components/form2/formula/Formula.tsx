import Edit from '@mui/icons-material/Edit';
import { IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormulaEditor from './FormulaEditor';
import DisplayFormula from './DisplayFormula';

interface FormulaProps {
  fields: any[];
  formula: any;
  onFormulaChange: (formula: any) => void;
}

export default function Formula({ fields, formula, onFormulaChange }: FormulaProps) {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!formula?.condition && !edit) {
      setEdit(true);
    }
  }, [formula]);

  return (
    <div className="mb-3">
      <Typography>Rules</Typography>
      {edit ? (
        <FormulaEditor
          fields={fields}
          formula={formula}
          onSave={(newFormula) => {
            onFormulaChange(newFormula);
            setEdit(false);
          }}
          onClose={formula ? () => setEdit(false) : null}
        />
      ) : (
        <div className="d-flex align-items-center">
          <DisplayFormula fields={fields} formula={formula} />
          <IconButton edge="end" onClick={() => setEdit(true)}>
            <Edit />
          </IconButton>
        </div>
      )}
    </div>
  );
}
