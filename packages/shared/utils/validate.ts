interface IReturn {
  error: boolean;
  errorMessage: string;
}

interface Field {
  fieldType: any;
  options: any;
  template?: any;
  form?: any;
}

export const validateValue = (validate: boolean, value: any, field: Field): IReturn => {
  let result = { error: false, errorMessage: '' };
  const { options, fieldType } = field;

  if (!validate) {
    return result;
  }

  if (options?.required && !value) {
    return { error: true, errorMessage: 'Required' };
  }

  switch (fieldType) {
    case 'number': {
      if (options?.required && !value?.valueNumber) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'email': {
      if (options?.required && !value?.value) {
        result = { error: true, errorMessage: 'Required' };
      } else if (value?.value && !validateEmail(value?.value)) {
        result = { error: true, errorMessage: 'Invalid Email' };
      }
      break;
    }
    case 'phoneNumber': {
      if (options?.required && !value?.valueNumber) {
        result = { error: true, errorMessage: 'Required' };
      } else if (value?.valueNumber && !(value?.valueNumber?.toString().length >= 11)) {
        result = { error: true, errorMessage: 'Invalid Phone Number' };
      }
      break;
    }
    case 'boolean': {
      if (options?.required && !value?.valueBoolean) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'date':
    case 'dateTime': {
      if (options?.required && !value?.valueDate) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'image': {
      if (options?.required && !(value?.tempMedia?.length > 0)) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'media': {
      if (options?.required && !value?.valueDate) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    case 'existingForm': {
      if (options?.required && !value?.response?._id) {
        result = { error: true, errorMessage: 'Required' };
      }
      break;
    }
    // case 'select': {
    //   const optionsTemplate = options?.optionsTemplate || value?.options?.optionsTemplate;
    //   if (
    //     optionsTemplate === 'template' &&
    //     options?.required &&
    //     ((!field?.template && !value?.template) || (field?.template && !value?.page))
    //   ) {
    //     result = { error: true, errorMessage: 'Required' };
    //   } else if (
    //     optionsTemplate === 'existingForm' &&
    //     options?.required &&
    //     ((!field?.form && !value?.form) || (field?.form && !value?.response))
    //   ) {
    //     result = { error: true, errorMessage: 'Required' };
    //   } else if (
    //     !['template', 'existingForm'].includes(optionsTemplate) &&
    //     options?.required &&
    //     !value?.value
    //   ) {
    //     if (options?.showAsCheckbox && value?.values?.length > 0) {
    //       result = { error: false, errorMessage: '' };
    //     } else {
    //       result = { error: true, errorMessage: 'Required' };
    //     }
    //   }
    //   break;
    // }
    default: {
      if (options?.required && !value?.value) {
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
