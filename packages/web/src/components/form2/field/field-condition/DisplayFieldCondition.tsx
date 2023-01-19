/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getForm } from '@frontend/shared/hooks/form';
import { IResponse } from '@frontend/shared/types';
import { IConditionPart, ICondition, IField, IForm } from '@frontend/shared/types/form';
import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import moment from 'moment';
import { getResponse } from '@frontend/shared/hooks/response/getResponse';

interface DisplayFieldConditionProps {
  conditions: ICondition[];
  formFields?: IField[];
}

export default function DisplayFieldCondition({
  conditions = [],
  formFields = [],
}: DisplayFieldConditionProps) {
  const [forms, setForms] = useState({});
  const [responses, setResponses] = useState({});

  const getForms = async () => {
    const { responses: tempResponses, forms: tempForms } = await getConditionsFormAndResponse(
      conditions,
    );
    setForms(tempForms);
    setResponses(tempResponses);
  };

  useEffect(() => {
    getForms();
  }, [conditions]);

  return (
    <div data-testid="displayFieldCondition-output">
      {getFieldCondition({ conditions, formFields, forms, responses })}
    </div>
  );
}

interface GetFieldCondition {
  conditions: ICondition[];
  forms: { [key: string]: IForm };
  responses: { [key: string]: IResponse };
  formFields?: any;
}

export const getFieldCondition = ({
  conditions,
  formFields,
  forms,
  responses,
}: GetFieldCondition) => {
  let conditionString = '';
  conditions?.forEach((condition) => {
    if (condition?.operator) {
      conditionString += ` ${condition?.operator}`;
    }

    // leftside;
    if (condition?.left?.formId) {
      const form = forms[condition?.left?.formId];
      let formName = slugifyVariable(form?.name);
      if (condition?.left?.formId === 'auth') {
        formName = 'auth';
      }
      conditionString += ` $${formName}`;
      if (condition?.left?.fieldId) {
        const subFieldLabel = getSubFieldsLabel(condition?.left, forms);
        if (subFieldLabel) {
          conditionString += `${slugifyVariable(subFieldLabel)}`;
        }
      }
    }

    if (condition?.conditionType) {
      conditionString += ` ${condition?.conditionType}`;
    }

    // rightside
    if (condition?.right?.value?.includes('auth.')) {
      conditionString += ` $${condition?.right?.value}`;
    } else if (condition?.right?.value === 'constantValue') {
      conditionString += ` "${condition?.right?.constantValue}"`;
    } else if (condition?.right?.value === 'form' && forms?.[condition?.right?.formId]?._id) {
      const form = forms?.[condition?.right?.formId];
      conditionString += ` $${slugifyVariable(form?.name)}`;
      if (condition?.right?.fieldId) {
        const subFieldLabel = getSubFieldsLabel(condition?.right, forms, responses);
        if (subFieldLabel) {
          conditionString += `${slugifyVariable(subFieldLabel)}`;
        }
      }
    } else if (condition?.right?.value) {
      const fieldLabel = formFields?.find((f) => f?._id === condition?.right?.value)?.label;
      if (fieldLabel) {
        conditionString += ` $${slugifyVariable(fieldLabel)}`;
      }
    }
  });
  return conditionString;
};

const getSubFieldsLabel = (
  subField: IConditionPart,
  forms: { [key: string]: IForm },
  responses?: { [key: string]: IResponse },
) => {
  let conditionString = '';
  const form = forms?.[subField?.formId];
  if (subField?.fieldId && form?._id) {
    let fieldLabel;
    if (schemaFields?.includes(subField?.fieldId)) {
      fieldLabel = `${subField?.fieldId}`;
    } else {
      const selectedField = form?.fields?.find((field) => field?._id === subField?.fieldId);
      fieldLabel = selectedField?.label;
      if (subField?.responseId && responses?.[subField?.responseId]) {
        const selectedValue = responses?.[subField?.responseId]?.values.find(
          (value) => value?.field === subField?.fieldId,
        );
        fieldLabel += `(${getValue(selectedField, selectedValue)})`;
      }
    }
    if (fieldLabel) {
      conditionString += `.${fieldLabel}`;
      if (subField?.subField?.fieldId) {
        const subFieldLabel = getSubFieldsLabel(subField?.subField, forms);
        if (subFieldLabel) {
          conditionString += `${subFieldLabel}`;
        }
      }
    }
  }
  return conditionString;
};

const slugifyVariable = (value = '') => {
  return slugify(value, '_');
};

const schemaFields = ['_id', 'createdAt', 'createdBy'];

const getFormIds = (part: IConditionPart) => {
  let formIds: string[] = [];
  if (part?.formId) {
    formIds.push(part?.formId);
  }
  if (part?.subField?.formId) {
    const nestedFormIds = getFormIds(part?.subField);
    if (nestedFormIds?.length > 0) {
      formIds = [...formIds, ...nestedFormIds];
    }
  }
  return formIds;
};

const getResponseIds = (part: IConditionPart) => {
  let responseIds: string[] = [];
  if (part?.responseId) {
    responseIds.push(part?.responseId);
  }
  if (part?.subField?.responseId) {
    const nestedFormIds = getResponseIds(part?.subField);
    if (nestedFormIds?.length > 0) {
      responseIds = [...responseIds, ...nestedFormIds];
    }
  }
  return responseIds;
};

export const getValue = (field, value) => {
  switch (field?.fieldType) {
    case 'number':
    case 'phoneNumber': {
      return value.valueNumber;
    }
    case 'date': {
      return value?.valueDate && moment(value?.valueDate).format('L');
    }
    case 'dateTime': {
      return value?.valueDate && moment(value?.valueDate).format('lll');
    }
    case 'boolean': {
      return value?.valueBoolean ? 'Yes' : 'No';
    }
    case 'response': {
      return getLabel(field?.options?.formField, value?.response);
    }
    case 'form': {
      return value?.form?.name;
    }
    default: {
      return value.value;
    }
  }
};

const getLabel = (formField: string, response: any): string => {
  let label = '';
  const fieldValues = response?.values?.filter((value) => value?.field === formField);
  fieldValues?.forEach((f, i) => {
    if (f?.value) {
      label += i > 0 ? `${f?.value}` : f?.value;
    }
  });
  return label;
};

export const getConditionsFormAndResponse = async (conditions: ICondition[]) => {
  try {
    const formIds = [];
    const responseIds = [];
    conditions?.forEach((condition) => {
      const leftFormIds = getFormIds(condition?.left);
      const rightFormIds = getFormIds(condition?.right);
      const rightResponseIds = getResponseIds(condition?.right);
      [...leftFormIds, ...rightFormIds].forEach((formId) => {
        if (formId && !formIds?.includes(formId)) {
          formIds.push(formId);
        }
      });
      rightResponseIds.forEach((responseId) => {
        if (responseId && !responseIds?.includes(responseId)) {
          responseIds.push(responseId);
        }
      });
    });
    const forms: { [key: string]: IForm } = {};
    for (const formId of formIds) {
      if (!forms[formId]?._id) {
        const form = await getForm(formId);
        if (form?._id) {
          forms[form?._id] = form;
        }
      }
    }
    const responses: { [key: string]: IResponse } = {};
    for (const responseId of responseIds) {
      if (!responses[responseId]?._id) {
        const response = await getResponse(responseId);
        if (response?._id) {
          responses[response?._id] = response;
        }
      }
    }
    return { forms, responses };
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(
      `Error while getting conditions form, ${error?.message} try refreshing the page or come back later.`,
    );
  }
};
