import { IField } from '../types/form';

interface IReturn {
  error: boolean;
  errorMessage: string;
}

export const validateValue = (validate: boolean, value: any, field: Partial<IField>): IReturn => {
  let result = { error: false, errorMessage: '' };
  const { options, fieldType } = field;

  if (!validate || !options?.required) {
    return result;
  }

  if (!value) {
    return { error: true, errorMessage: 'Required' };
  }

  switch (fieldType) {
    case 'number': {
      if (!value?.valueNumber || (field.options?.physicalQuantity && !value?.options?.unit)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'email': {
      if (!value?.value) {
        result = { error: true, errorMessage: 'Required' };
      } else if (value?.value && !validateEmail(value?.value)) {
        result = { error: true, errorMessage: 'Invalid Email' };
      }
      break;
    }
    case 'phoneNumber': {
      if (!value?.valueNumber) {
        result = { error: true, errorMessage: 'Required' };
      } else if (value?.valueNumber && !(value?.valueNumber?.toString().length >= 11)) {
        result = { error: true, errorMessage: 'Invalid Phone Number' };
      }
      break;
    }
    case 'boolean': {
      if (!value?.valueBoolean) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'date':
    case 'dateTime': {
      if (!value?.valueDate) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'image': {
      if (!(value?.tempMedia?.length > 0)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'media': {
      if (!value?.valueDate) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'form': {
      if (!value?.form?._id) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'response': {
      if (!value?.response?._id) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'board': {
      if (!value?.options?.board) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'diagram': {
      if (!value?.options?.diagram) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'flowDiagram': {
      if (!value?.options?.flowDiagram) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'condition': {
      if (!(value?.options?.conditions?.length > 0)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    default: {
      if (!value?.value) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
  }
  return { error: result.error, errorMessage: result.error && result.errorMessage };
};

function validateEmail(elementValue) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

export const validateForm = (fields, values): boolean => {
  let validate = false;
  fields?.every((field) => {
    if (
      field?.options?.required &&
      values.filter((value) => value.field === field._id).length === 0
    ) {
      validate = true;
    } else {
      values
        .filter((value) => value.field === field._id)
        ?.map((tempValue) => {
          if (validateValue(true, tempValue, field).error) {
            validate = true;
          }
          return tempValue;
        });
    }
    return !validate;
  });
  return validate;
};
