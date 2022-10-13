import { useEffect, useState } from 'react';
import { useGetResponses } from './getResponse';

export function useCheckIfAlreadySubmitted({ formId, workFlowFormResponseParentId }) {
  const { data, refetch } = useGetResponses({
    formId,
    workFlowFormResponseParentId,
    onlyMy: true,
    limit: 1,
  });

  const [alreadySubmitted, setAlreadySubmitted] = useState(null);

  useEffect(() => {
    if (data?.getResponses) {
      if (data?.getResponses?.data?.length > 0) {
        setAlreadySubmitted(data?.getResponses?.data?.[0]?._id);
      }
    }
  }, [data?.getResponses]);

  return { alreadySubmitted, refetch };
}
