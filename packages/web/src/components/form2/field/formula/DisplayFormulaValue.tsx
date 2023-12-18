import React from 'react';
import { evaluate } from 'mathjs';
import { IField, IFormula } from '@frontend/shared/types/form';
import { IValue } from '@frontend/shared/types/response';
import { getFormula } from './DisplayFormula';

interface DisplayFormulaValueProps {
  formula: IFormula;
  field: IField;
  values: IValue[];
}

export default function DisplayFormulaValue({ formula, values, field }: DisplayFormulaValueProps) {
  return (
    <div>
      {evaluateFormula(getFormula(formula?.variables, [], values))}
      {field?.options?.physicalQuantity && ` ${field?.options?.unit}`}
    </div>
  );
}

export const evaluateFormula = (formula: string) => {
  let value;
  try {
    if (formula) value = evaluate(formula);
  } catch (error) {
    value = 'Invalid values';
  }
  return value;
};
