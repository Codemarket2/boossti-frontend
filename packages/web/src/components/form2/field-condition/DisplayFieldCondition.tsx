import { useGetForm } from '@frontend/shared/hooks/form';
import { IField } from '@frontend/shared/types/form';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import ErrorLoading from '../../common/ErrorLoading';

interface DisplayFieldConditionProps {
  field: IField;
  formFields: IField[];
}

export default function DisplayCondition({ field, formFields }: DisplayFieldConditionProps) {
  const { data, error } = useGetForm(field?.form?._id);
  if (!data || error) {
    return (
      <ErrorLoading error={error}>
        <Skeleton height={50} />;
      </ErrorLoading>
    );
  }
  return (
    <div>{getFieldCondition(field?.options?.conditions, formFields, data?.getForm?.fields)}</div>
  );
}

export const getFieldCondition = (conditions, valueFormFields, formFields) => {
  let condition = '';
  conditions?.forEach((con) => {
    if (con?.operator) {
      condition += ` ${con?.operator}`;
    }
    if (con?.fieldId) {
      const fieldLabel = formFields?.find((formField) => formField?._id === con?.fieldId)?.label;
      if (fieldLabel) {
        condition += ` ${fieldLabel}`;
      }
    }
    if (con?.conditionType) {
      condition += ` ${con?.conditionType}`;
    }
    if (con?.value === 'constantValue') {
      condition += ` ${con?.constantValue}`;
    } else if (con?.value) {
      const fieldLabel = valueFormFields?.find((f) => f?._id === con?.value)?.label;
      if (fieldLabel) {
        condition += ` ${fieldLabel}`;
      }
    }
  });
  return condition;
};
