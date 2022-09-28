import { useEffect } from 'react';
import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { guestClient as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';

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
      const { data } = await checkUnique({
        value,
        formId,
        responseId,
        caseInsensitiveUnique: field?.options?.caseInsensitiveUnique,
        fieldType: field?.fieldType,
      });
      if (data.getCheckUnique) {
        setUnique(data.getCheckUnique);
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
  value: any;
  formId: string;
  responseId: string;
  fieldType: string;
  caseInsensitiveUnique?: boolean;
}

async function checkUnique({
  value,
  formId,
  responseId,
  caseInsensitiveUnique,
  fieldType,
}: ICheckUniquePayload) {
  const response = await apolloClient.query({
    query: GET_CHECK_UNIQUE,
    variables: {
      value: {
        field: value?.field,
        value: value?.value,
        valueNumber: value?.valueNumber,
        response: value?.response?._id,
        form: value?.form?._id,
      },
      formId,
      responseId,
      caseInsensitiveUnique,
      fieldType,
    },
    fetchPolicy: 'network-only',
  });
  return response;
}
