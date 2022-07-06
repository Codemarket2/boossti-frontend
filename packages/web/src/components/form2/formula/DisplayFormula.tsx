import React from 'react';

interface DisplayFormulaProps {
  fields: any[];
  formula: any;
}

export default function DisplayFormula({ formula, fields }: DisplayFormulaProps) {
  return (
    <div>
      {formula?.condition}
      {getFormula(formula?.variables, fields)}
    </div>
  );
}

const getFormula = (variables, fields) => {
  let formula = `(`;
  variables?.forEach((variable) => {
    if (variable?.operation) {
      formula += ` ${operationSymbols[variable?.operation] || ''}`;
    }
    if (variable?.value === 'brackets') {
      formula += ` ${getFormula(variable?.variables, fields)}`;
    } else if (variable?.value === 'constantValue') {
      formula += ` ${variable?.constantValue || ''}`;
    } else {
      formula += ` ${fields?.find((field) => field?._id === variable?.value)?.label || ''}`;
    }
  });
  formula += ' )';
  return formula;
};

const operationSymbols = {
  add: '+',
  subtract: '-',
  divide: '%',
  multiply: 'x',
};
