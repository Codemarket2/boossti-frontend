/* eslint-disable no-await-in-loop */
import moment from 'moment';
import { getForm } from '@frontend/shared/hooks/form/getForm';
import { getResponseByParentId, getResponse } from '@frontend/shared/hooks/response/getResponse';
import { getLabel } from '../response/SelectResponse';

const getResponseById = async (responseId) => {
  let forms = [];
  const response = await getResponse(responseId);
  const form = await getForm(response?.formId);
  if (response && form) {
    forms.push({ ...form, response });
  }
  if (response?.workFlowFormReponseParentId) {
    const newForms = await getResponseById(response?.workFlowFormReponseParentId);
    if (newForms?.length > 0) {
      forms = [...forms, ...newForms];
    }
  }
  return forms;
};

export const replaceVariables = async (oldBody, oldVariables, mainForm, mainResponse) => {
  let body = oldBody;
  const formIds = [];
  let forms = [];

  if (mainResponse?.parentId?._id) {
    oldVariables?.forEach((variable) => {
      if (
        variable.formId &&
        !formIds.includes(variable.formId) &&
        variable.formId !== mainForm?._id?.toString()
      ) {
        formIds.push(variable.formId);
      }
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const formId of formIds) {
      const form = await getForm(formId);
      const response = await getResponseByParentId(formId, mainResponse?.parentId?._id);
      if (form && response) {
        forms.push({ ...form, response });
      }
    }
  } else if (mainResponse?.workFlowFormReponseParentId) {
    const newForms = await getResponseById(mainResponse?.workFlowFormReponseParentId);
    if (newForms?.length > 0) {
      forms = [...forms, ...newForms];
    }
  }

  const variables = oldVariables?.map((oneVariable) => {
    const variable = { ...oneVariable, value: '' };
    let field = null;
    let value = null;
    field = mainForm?.fields.find((f) => f._id?.toString() === variable?.field);
    value = mainResponse?.values?.find((v) => v.field === variable?.field);
    if (variable.formId) {
      const form = forms?.find((f) => f._id?.toString() === variable.formId);
      if (form) {
        field = form?.fields.find((f) => f._id?.toString() === variable?.field);
        value = form?.response?.values?.find((v) => v.field === variable?.field);
      }
    }
    if (field && value) {
      variable.value = getValue(field, value);
    }
    return variable;
  });

  variables.forEach((variable) => {
    body = body.split(`{{${variable.name}}}`).join(variable.value || '');
  });
  return body;
};

const getValue = (field, value) => {
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
      return value.valueBoolean?.toString();
    }
    case 'select': {
      if (field?.options?.optionsTemplate === 'type') {
        return value?.page?.title;
      }
      if (field?.options?.optionsTemplate === 'existingForm') {
        return getLabel(field?.options?.formField, value?.response);
      }
      return value?.value;
    }
    default: {
      return value.value;
    }
  }
};
