interface IReturn {
  error: boolean;
  errorMessage: string;
}

export const validateValue = (
  validate: boolean,
  value: any,
  options: any,
  fieldType: string,
): IReturn => {
  let result = { error: false, errorMessage: '' };

  if (!validate) {
    return result;
  }

  switch (fieldType) {
    case 'number': {
      if (options.required && (!value || !value?.valueNumber)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'email': {
      if (options.required && (!value || !value?.value)) {
        result = { error: true, errorMessage: 'Required' };
      } else if (value?.value && !validateEmail(value?.value)) {
        result = { error: true, errorMessage: 'Invalid Email' };
      }
      break;
    }
    case 'phoneNumber': {
      if (options.required && (!value || !value?.valueNumber)) {
        result = { error: true, errorMessage: 'Required' };
      } else if (value?.valueNumber && !(value?.valueNumber?.toString().length >= 11)) {
        result = { error: true, errorMessage: 'Invalid Phone Number' };
      }
      break;
    }
    case 'checkbox': {
      if (options.required && (!value || !value?.valueBoolean)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'date':
    case 'dateTime': {
      if (options.required && (!value || !value?.valueDate)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'image': {
      if (options.required && (!value || !(value?.tempMedia?.length > 0))) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'media': {
      if (options.required && (!value || !value?.valueDate)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'select': {
      if (options?.optionsListType === 'type' && options.required && (!value || !value?.itemId)) {
        result = { error: true, errorMessage: 'Required' };
      } else if (
        options?.optionsListType === 'existingForm' &&
        options.required &&
        (!value || !value?.response)
      ) {
        result = { error: true, errorMessage: 'Required' };
      } else if (
        !(options?.optionsListType === 'type' || options?.optionsListType === 'existingForm') &&
        options.required &&
        (!value || !value?.value)
      ) {
        if (options?.showAsCheckbox && value?.values?.length) {
          result = { error: false, errorMessage: '' };
        } else {
          result = { error: true, errorMessage: 'Required' };
        }
      }
      break;
    }
    default: {
      if (options.required && (!value || !value?.value)) {
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
