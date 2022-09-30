import { useEffect, useState } from 'react';
import { checkUnique } from './checkUnique';
import { IForm, IValue } from '../../types';

interface IUseConstraint {
  form: IForm;
  values: IValue[];
  responseId?: string;
}

export const useConstraint = ({ form, values, responseId }: IUseConstraint) => {
  const [constraintErrors, setConstraintsError] = useState([]);
  const [constraintsLoading, setConstraintsLoading] = useState(false);

  useEffect(() => {
    let timeOutId;
    if (values?.length > 0) {
      timeOutId = setTimeout(handleConstraint, 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [values]);

  const handleConstraint = async () => {
    setConstraintsLoading(true);
    const constraints = form?.settings?.constraints?.filter(
      (constraint) => constraint?.constraintType === 'unique',
    );
    if (constraints?.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const constraint of constraints) {
        try {
          const valueFilter = { $and: [] };
          const combineFieldId = constraint?.fields?.join('-');
          constraint?.fields?.forEach((fieldId) => {
            const field = form?.fields?.find((f) => f?._id === fieldId);
            const value = values?.find((v) => v?.field === fieldId);
            const filter = getFieldFilterValue(field?.fieldType, value);
            valueFilter.$and.push({ ...filter, 'values.field': fieldId });
          });
          // eslint-disable-next-line no-await-in-loop
          const existingResponseId = await checkUnique({
            responseId,
            formId: form?._id,
            valueFilter,
          });
          // eslint-disable-next-line no-loop-func
          let newConstraintsError = [...constraintErrors];
          let isNew = true;
          newConstraintsError = newConstraintsError?.map((con) => {
            if (con?.combineFieldId === combineFieldId) {
              isNew = false;
              return { ...con, existingResponseId };
            }
            return con;
          });
          if (isNew) {
            newConstraintsError = [...newConstraintsError, { combineFieldId, existingResponseId }];
          }
          setConstraintsError(newConstraintsError);
        } catch (error) {
          alert(`Error in unique check, ${error?.message}`);
        }
      }
    }
    setConstraintsLoading(false);
  };

  return { constraintErrors, constraintsLoading };
};

export const getFieldFilterValue = (fieldType, value) => {
  let filter = {};
  switch (fieldType) {
    case 'number':
      filter = { 'values.valueNumber': value?.valueNumber };
      break;
    case 'form':
      filter = { 'values.form': value?.form?._id || null };
      break;
    case 'response':
      filter = { 'values.response': value?.response?._id || null };
      break;
    default:
      filter = { 'values.value': { $regex: `^${value?.value || ''}$`, $options: 'i' } };
      break;
  }
  return filter;
};
