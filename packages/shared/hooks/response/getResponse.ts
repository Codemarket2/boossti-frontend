import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_RESPONSE_BY_COUNT, GET_RESPONSES, GET_RESPONSE } from '../../graphql/query/response';
import { RESPONSE_SUB } from '../../graphql/subscription/response';
import { client as apolloClient } from '../../graphql';

export const defaultQueryVariables = {
  formId: null,
  parentId: null,
  page: 1,
  limit: 10,
  search: '',
  formField: null,
  onlyMy: false,
};

export function useGetResponses(
  formId: string,
  parentId: string = null,
  formField = null,
  onlyMy = false,
  responseId: string = null,
) {
  const [subsribed, setSubsribed] = useState(false);
  const [state, setState] = useState({
    ...defaultQueryVariables,
    showSearch: false,
    formField,
  });

  const { data, error, loading, subscribeToMore, refetch } = useQuery(GET_RESPONSES, {
    variables: { ...state, formId, parentId, responseId, onlyMy },
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

export async function getResponseByParentId(formId, parentId) {
  let response = null;
  try {
    const res = await apolloClient.query({
      query: GET_RESPONSES,
      variables: { ...defaultQueryVariables, limit: 1, formId, parentId },
    });
    if (res?.data?.getResponses?.data?.length > 0) {
      response = res?.data?.getResponses?.data[0];
    }
  } catch (error) {
    console.log({ error });
  }
  return response;
}
export async function getResponse(_id) {
  let response = null;
  try {
    const res = await apolloClient.query({
      query: GET_RESPONSE,
      variables: { _id },
    });
    if (res?.data?.getResponse) {
      response = res?.data?.getResponse;
    }
  } catch (error) {
    console.log({ error });
  }
  return response;
}
