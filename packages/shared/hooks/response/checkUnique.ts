import { useEffect } from 'react';
import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { guestClient as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';

interface IProps extends IHooksProps {
  formId: string;
  value: any;
  options: any;
  setUnique: (arg: boolean) => void;
  setUniqueLoading: (arg: boolean) => void;
  responseId?: string;
}

export const useCheckUnique = ({
  formId,
  value,
  options,
  setUnique,
  onAlert,
  responseId,
  setUniqueLoading,
}: IProps) => {
  const handleCheckUnique = async () => {
    try {
      const { data } = await checkUnique({
        value,
        formId,
        responseId,
        caseInsensitiveUnique: options?.caseInsensitiveUnique,
      });
      // debugger;
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
    if (options?.unique && value?.value?.length > 0) {
      timeOutId = setTimeout(() => handleCheckUnique(), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [value]);
  // return { loading };
};

interface IPayload {
  value: any;
  formId: string;
  responseId: string;
  caseInsensitiveUnique?: boolean;
}

async function checkUnique({ value, formId, responseId, caseInsensitiveUnique }: IPayload) {
  const response = await apolloClient.query({
    query: GET_CHECK_UNIQUE,
    variables: {
      value: {
        field: value?.field,
        value: value?.value,
        valueNumber: value?.valueNumber,
        responseId: value?.responseId,
      },
      formId,
      responseId,
      caseInsensitiveUnique,
    },
    fetchPolicy: 'network-only',
  });
  return response;
}
