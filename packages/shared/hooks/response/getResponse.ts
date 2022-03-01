import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_RESPONSE_BY_COUNT, GET_RESPONSES, GET_RESPONSE } from '../../graphql/query/response';
import { RESPONSE_SUB } from '../../graphql/subscription/response';

export const defaultQueryVariables = {
  formId: null,
  parentId: null,
  page: 1,
  limit: 10,
  search: '',
  formField: null,
};

export function useGetResponses(formId: string, parentId: string = null, formField = null) {
  const [subsribed, setSubsribed] = useState(false);
  const [state, setState] = useState({
    ...defaultQueryVariables,
    showSearch: false,
    formField,
  });

  const { data, error, loading, subscribeToMore, refetch } = useQuery(GET_RESPONSES, {
    variables: { ...state, formId, parentId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!subsribed) {
      setSubsribed(true);
      subscribeToMore({
        document: RESPONSE_SUB,
        variables: {
          formId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newItem = subscriptionData.data.responseSub;
          let isNew = true;
          let newData = prev?.getResponses?.data?.map((t) => {
            if (t._id === newItem._id) {
              isNew = false;
              return newItem;
            }
            return t;
          });
          if (isNew) {
            newData = [...prev?.getResponses?.data, newItem];
          }
          return {
            ...prev,
            getResponses: {
              ...prev.getResponses,
              data: newData,
            },
          };
        },
      });
    }
  }, []);

  return { data, error, loading, state, setState, refetch };
}

export function useGetResponse(_id: string): any {
  const { data, error, loading } = useQuery(GET_RESPONSE, {
    variables: { _id },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
}

export function useGetResponseByCount(formId: string, count: number): any {
  const { data, error, loading } = useQuery(GET_RESPONSE_BY_COUNT, {
    variables: { formId, count },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
}
