import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { guestClient as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { getFieldFilterValue } from './constraint';
import { IField, IValue } from '../../types';
import { CHECK_UNIQUE_BETWEEN_MULTIPLE_VALUES } from '../../graphql/mutation/response';

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
  const setting = useSelector((state: any) => state?.setting);
  const handleCheckUnique = async () => {
    try {
      const filter = getFieldFilterValue(field?.fieldType, value);
      const existingResponseId = await checkUnique({
        formId,
        responseId,
        valueFilter: { ...filter, 'values.field': field?._id },
        appId: setting?.appResponse?._id,
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
  appId: string;
}

export async function checkUnique({
  formId,
  responseId,
  valueFilter = {},
  appId,
}: ICheckUniquePayload) {
  const { data } = await apolloClient.query({
    query: GET_CHECK_UNIQUE,
    variables: {
      formId,
      responseId,
      valueFilter: JSON.stringify(valueFilter),
      appId,
    },
    fetchPolicy: 'network-only',
  });
  return data.getCheckUnique;
}

interface IUniqueBetweenMultipleValues {
  fields: IField[];
  values: IValue[];
}

export const uniqueBetweenMultipleValues = ({ fields, values }: IUniqueBetweenMultipleValues) => {
  const setting = useSelector((state: any) => state?.setting);
  const [checkUniqueMutation] = useMutation(CHECK_UNIQUE_BETWEEN_MULTIPLE_VALUES);
  const [uniqueBetweenMultipleValuesError, setUniqueBetweenMultipleValuesError] = useState([]);
  const [uniqueBetweenMultipleValuesLoading, setUniqueBetweenMultipleValuesLoading] = useState(
    false,
  );

  const uniqueCheck = async (uniqueFields) => {
    try {
      setUniqueBetweenMultipleValuesLoading(true);
      const errors = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const field of uniqueFields) {
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
          if (
            !hasDuplicateValue &&
            field?.fieldType === 'response' &&
            field?.options?.uniqueSubField?.formId
          ) {
            const responseIds = [];
            oldValues?.forEach((value) => {
              if (value?.response?._id) {
                responseIds.push(value?.response?._id);
              }
            });
            if (responseIds?.length > 1) {
              // eslint-disable-next-line no-await-in-loop
              const { data } = await checkUniqueMutation({
                variables: {
                  responseIds,
                  subField: JSON.stringify(field?.options?.uniqueSubField),
                  appId: setting?.appResponse?._id,
                },
              });
              if (data?.checkUniqueBetweenMultipleValues) {
                hasDuplicateValue = true;
              }
            }
          }
          if (hasDuplicateValue) {
            errors.push(field?._id);
          }
        }
      }
      setUniqueBetweenMultipleValuesError(errors);
      setUniqueBetweenMultipleValuesLoading(false);
    } catch (error) {
      setUniqueBetweenMultipleValuesLoading(false);
    }
  };

  useEffect(() => {
    const uniqueFields = fields?.filter(
      (field) => field?.options?.multipleValues && field?.options?.uniqueBetweenMultipleValues,
    );
    if (uniqueFields?.length > 0) {
      uniqueCheck(uniqueFields);
    }
  }, [values]);

  // useEffect(() => {
  //   if (fields?.length > 0) {
  //     const newFields = fields?.filter(
  //       (field) => field?.options?.multipleValues && field?.options?.uniqueBetweenMultipleValues,
  //     );
  //     setUniqueFields(newFields);
  //   }
  // }, [fields]);

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
