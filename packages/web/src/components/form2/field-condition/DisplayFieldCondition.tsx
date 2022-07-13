/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getForm } from '@frontend/shared/hooks/form';
import { ICondition, IField, IForm } from '@frontend/shared/types/form';
import React, { useEffect, useState } from 'react';
import slugify from 'slugify';

interface DisplayFieldConditionProps {
  conditions: ICondition[];
  formFields?: IField[];
}

export default function DisplayFieldCondition({
  conditions = [],
  formFields = [],
}: DisplayFieldConditionProps) {
  const [forms, setForms] = useState({});

  const getForms = async () => {
    try {
      const formIds = [];
      conditions?.forEach((con) => {
        if (con?.formId && !formIds?.includes(formIds)) {
          formIds.push(con?.formId);
        }
      });
      const tempForm = {};
      for (const formId of formIds) {
        if (!tempForm[formId]?._id) {
          const form = await getForm(formId);
          if (form?._id) {
            tempForm[form?._id] = form;
          }
        }
      }
      setForms(tempForm);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Error in form query, ${error?.message}`);
    }
  };
  useEffect(() => {
    getForms();
  }, []);

  return <div>{getFieldCondition(conditions, formFields, forms)}</div>;
}

export const getFieldCondition = (conditions, valueFormFields, forms: { [key: string]: IForm }) => {
  let conditionString = '';
  conditions?.forEach((condition) => {
    if (condition?.operator) {
      conditionString += ` ${condition?.operator}`;
    }
    if (condition?.fieldId) {
      const form = forms[condition?.formId];
      const formName = slugify(form?.name || '', '_');
      const formFields = form?.fields || [];
      let fieldLabel = formFields?.find((formField) => formField?._id === condition?.fieldId)
        ?.label;
      if (fieldLabel) {
        fieldLabel = slugify(fieldLabel || '', '_');
        conditionString += ` $${formName}.${fieldLabel}`;
      }
    }
    if (condition?.conditionType) {
      conditionString += ` ${condition?.conditionType}`;
    }
    if (condition?.value?.includes('user.')) {
      conditionString += ` $${condition?.value}`;
    } else if (condition?.value === 'constantValue') {
      conditionString += ` "${condition?.constantValue}"`;
    } else if (condition?.value) {
      const fieldLabel = valueFormFields?.find((f) => f?._id === condition?.value)?.label;
      if (fieldLabel) {
        conditionString += ` $${slugify(fieldLabel, '_')}`;
      }
    }
  });
  return conditionString;
};
