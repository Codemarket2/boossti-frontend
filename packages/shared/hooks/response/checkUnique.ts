import { useEffect, useState } from 'react';
import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { guestClient as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { getFieldFilterValue } from './constraint';
import { IForm, IValue } from '../../types';

interface IUseCheckUniqueProps extends IHooksProps {
  formId: string;
  value: any;
  field: any;
  setUnique: (arg: boolean) => void;
  setUniqueLoading: (arg: boolean) => void;
  responseId?: string;
}

export const useCheckUnique = ({
  formId,
  value,
  field,
  setUnique,
  onAlert,
  responseId,
  setUniqueLoading,
}: IUseCheckUniqueProps) => {
  const handleCheckUnique = async () => {
    try {
      const filter = getFieldFilterValue(field?.fieldType, value);
      const existingResponseId = await checkUnique({
        formId,
        responseId,
        valueFilter: { ...filter, 'values.field': field?._id },
      });
      if (existingResponseId) {
        setUnique(existingResponseId);
      }
      setUniqueLoading(false);
    } catch (error) {
      setUniqueLoading(false);
      setUnique(true);
      onAlert('Error unique check', error.message);
    }
  };

  useEffect(() => {
    let timeOutId;
    if (field?.options?.unique) {
      let check = false;
      if (field?.fieldType === 'response' && value?.response?._id) {
        check = true;
      } else if (field?.fieldType === 'form' && value?.form?._id) {
        check = true;
      } else if (value?.value?.length > 0) {
        check = true;
      }
      if (check) {
        timeOutId = setTimeout(() => handleCheckUnique(), 1000);
        return () => clearTimeout(timeOutId);
      }
    }
  }, [value]);
};

interface ICheckUniquePayload {
  formId: string;
  responseId?: string;
  valueFilter: any;
}

export async function checkUnique({ formId, responseId, valueFilter = {} }: ICheckUniquePayload) {
  const { data } = await apolloClient.query({
    query: GET_CHECK_UNIQUE,
    variables: {
      formId,
      responseId,
      valueFilter: JSON.stringify(valueFilter),
    },
    fetchPolicy: 'network-only',
  });
  return data.getCheckUnique;
}

interface IUniqueBetweenMultipleValues {
  form: IForm;
  values: IValue[];
}

export const uniqueBetweenMultipleValues = ({ form, values }: IUniqueBetweenMultipleValues) => {
  const [uniqueFields, setUniqueFields] = useState([]);
  const [uniqueBetweenMultipleValuesError, setUniqueBetweenMultipleValuesError] = useState([]);
  const [uniqueBetweenMultipleValuesLoading, setUniqueBetweenMultipleValuesLoading] = useState(
    false,
  );

  const uniqueCheck = async () => {
    try {
      setUniqueBetweenMultipleValuesLoading(true);
      const errors = [];
      uniqueFields?.forEach((field) => {
        const fieldValues = values?.filter((value) => value?.field === field?._id);
        if (fieldValues?.length > 1) {
          let hasDuplicateValue = false;
          const oldValues = [];
          fieldValues?.forEach((value) => {
            if (checkForDuplicateValue({ field, value, oldValues })) {
              hasDuplicateValue = true;
            }
            oldValues.push(value);
          });
          if (hasDuplicateValue) {
            errors.push(field?._id);
          }
        }
      });
      setUniqueBetweenMultipleValuesError(errors);
      setUniqueBetweenMultipleValuesLoading(false);
    } catch (error) {
      setUniqueBetweenMultipleValuesLoading(false);
    }
  };

  useEffect(() => {
    if (uniqueFields?.length > 0) {
      uniqueCheck();
    }
  }, [values]);

  useEffect(() => {
    if (form?.fields?.length > 0) {
      const newFields = form?.fields?.filter(
        (field) => field?.options?.multipleValues && field?.options?.uniqueBetweenMultipleValues,
      );
      setUniqueFields(newFields);
    }
  }, [form?.fields]);

  return { uniqueBetweenMultipleValuesError, uniqueBetweenMultipleValuesLoading };
};

const checkForDuplicateValue = ({ field, value, oldValues }) => {
  let result = false;
  switch (field?.fieldType) {
    case 'text':
    case 'email':
    case 'password':
    case 'richTextarea':
    case 'textarea': {
      if (value?.value) {
        const existingValue = oldValues?.find((v) => v?.value === value?.value);
        if (existingValue) {
          result = true;
        }
      }
      break;
    }
    case 'number':
    case 'phoneNumber': {
      if (value?.valueNumber) {
        const existingValue = oldValues?.find((v) => v?.valueNumber === value?.valueNumber);
        if (existingValue) {
          result = true;
        }
      }
      break;
    }
    case 'form': {
      if (value?.form?._id) {
        const existingValue = oldValues?.find((v) => v?.form?._id === value?.form?._id);
        if (existingValue) {
          result = true;
        }
      }
      break;
    }
    case 'response': {
      if (value?.response?._id) {
        const existingValue = oldValues?.find((v) => v?.response?._id === value?.response?._id);
        if (existingValue) {
          result = true;
        }
      }
      break;
    }
    default:
      break;
  }
  return result;
};
