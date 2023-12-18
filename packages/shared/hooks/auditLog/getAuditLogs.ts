import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_AUDIT_LOGS } from '../../graphql/query/auditLog';
import { UPDATED_FORM } from '../../graphql/subscription/form';
import { RESPONSE_SUB } from '../../graphql/subscription/response';

interface IProps {
  documentId: string;
  formId?: string;
}

export const useGetAuditLogs = ({ documentId, formId }: IProps) => {
  const [input, setInput] = useState({ page: 1, limit: 20 });
  const { data, error, loading, refetch } = useQuery(GET_AUDIT_LOGS, {
    variables: { ...input, documentId, formId },
    fetchPolicy: 'cache-and-network',
  });
  const { data: responseSubData } = useSubscription(RESPONSE_SUB, { variables: { formId } });
  const { data: formSubData } = useSubscription(UPDATED_FORM, { variables: { _id: formId } });

  useEffect(() => {
    if (responseSubData?.responseSub?._id || formSubData?.updatedForm?._id) {
      refetch();
    }
  }, [responseSubData, formSubData]);

  return { data, error, loading, input, setInput };
};
