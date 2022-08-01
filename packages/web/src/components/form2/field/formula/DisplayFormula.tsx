import { IField, IFormula, IFormulaVariable } from '@frontend/shared/types/form';
import { IValue } from '@frontend/shared/types/response';
import { Typography } from '@mui/material';
import React from 'react';

interface DisplayFormulaProps {
  fields: IField[];
  formula: IFormula;
}

export default function DisplayFormula({ formula, fields }: DisplayFormulaProps) {
  return (
    <Typography>
      {formula?.condition}
      {getFormula(formula?.variables, fields)}
    </Typography>
  );
}

export const getFormula = (variables: IFormulaVariable[], fields: IField[], values?: IValue[]) => {
  let formula = `(`;
  variables?.forEach((variable) => {
    let value = '';
    const valueType = variable?.value;
    if (valueType === 'brackets') {
      const tempValue = getFormula(variable?.variables, fields, values);
      if (tempValue) value = tempValue;
    } else if (valueType === 'constantValue') {
      const tempValue = variable?.constantValue;
      if (tempValue) value = tempValue?.toString();
    } else if (valueType) {
      let tempValue;
      if (values?.length > 0) {
        tempValue = values?.find((v) => v?.field === valueType)?.valueNumber?.toString();
      } else {
        tempValue = fields?.find((field) => field?._id === valueType)?.label;
      }
      if (tempValue) value = tempValue;
    }
    if (value) {
      if (variable?.operation) {
        formula += ` ${operationSymbols[variable?.operation]}`;
      }
      formula += ` ${value}`;
    }
  });
  formula += ' )';
  return formula;
};

const operationSymbols = {
  add: '+',
  subtract: '-',
  divide: '/',
  multiply: '*',
};
