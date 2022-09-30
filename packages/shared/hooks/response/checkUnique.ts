import { useEffect } from 'react';
import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { guestClient as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { getFieldFilterValue } from './constraint';

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
