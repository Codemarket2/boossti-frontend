import { useEffect } from 'react';
import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { client as apolloClient } from '../../graphql';
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
  // const [loading, setLoading] = useState(false);
  const handleCheckUnique = async () => {
    try {
      // setUniqueLoading(true);
      const { data } = await checkUnique(value, formId, responseId);
      // debugger;
      if (data.getCheckUnique) {
        setUnique(data.getCheckUnique);
      }
      setUniqueLoading(false);
    } catch (error) {
      setUniqueLoading(false);
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

async function checkUnique(value: any, formId: string, responseId: string) {
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
    },
    fetchPolicy: 'network-only',
  });
  return response;
}
