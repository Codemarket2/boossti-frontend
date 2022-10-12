import { IField } from '../types/form';

interface IReturn {
  error: boolean;
  errorMessage: string;
}
/**
 * is used to check if a field's value is valid or not
 * - if `returnValue.error === False` then the field's value is `valid`
 * - if `returnValue.error === True` then the field's value is `invalid`
 */
export const validateValue = (validate: boolean, value: any, field: Partial<IField>): IReturn => {
  let result = { error: false, errorMessage: '' };
  const { options, fieldType } = field;

  if (!validate || !options?.required || fieldType === 'label') {
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

/**
 * used to check if `all` the required fields of a form are valid
 * - if the `returnValue === False` means `all` the required fields are `valid`
 * - if the `returnValue === True` means atleast `1` required field is `invalid`
 * */
export const validateResponse = (fields, values): boolean => {
  const isValid = fields?.every((field) => {
    // IF THE FIELD IS OPTIONAL, THEN SKIP VALIDATION OF IT's VALUE
    if (!field?.options?.required || field.fieldType === 'label') return true;

    // FIELD IS REQUIRED, SO DO SOME VALIDATION
    const atleastOneValidValue = values.some((fieldValue) => {
      // CHECKS IF THE FIELD VALUE BELONGS TO THE field, IF IT DOESN'T THEN SKIP
      if (fieldValue.field !== field._id) return false;

      return !validateValue(true, fieldValue, field).error;
    });

    return atleastOneValidValue;
  });

  return !isValid;
};
