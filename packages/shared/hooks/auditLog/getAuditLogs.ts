import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_AUDIT_LOGS } from '../../graphql/query/auditLog';

interface IProps {
  documentId: string;
  formId?: string;
}

export const useGetAuditLogs = ({ documentId, formId }: IProps) => {
  const [input, setInput] = useState({ page: 1, limit: 30 });
  const { data, error, loading, refetch } = useQuery(GET_AUDIT_LOGS, {
    variables: { ...input, documentId, formId },
    fetchPolicy: 'cache-and-network',
  });

  let hadNextPage = false;
  if (data?.getAuditLogs?.count > input.page * input.limit) {
    hadNextPage = true;
  }
  return { data, error, loading, hadNextPage };
};
