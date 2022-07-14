import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_RESPONSE_BY_COUNT, GET_RESPONSES, GET_RESPONSE } from '../../graphql/query/response';
import {
  DELETED_RESPONSE,
  RESPONSE_SUB,
  UPDATE_RESPONSE_SUB,
} from '../../graphql/subscription/response';
import { client as apolloClient, guestClient } from '../../graphql';
// import { UPDATE_RESPONSE } from '../../graphql/mutation/response';

export const defaultQueryVariables = {
  formId: null,
  page: 1,
  limit: 10,
  search: '',
  formField: null,
  onlyMy: false,
};

interface IProps {
  formId: string;
  formField?: string;
  onlyMy?: boolean;
  workFlowFormResponseParentId?: string;
  appId?: string;
  installId?: string;
  search?: string;
  valueFilter?: any;
}

export function useGetResponses({
  formId,
  formField = null,
  onlyMy = false,
  workFlowFormResponseParentId = null,
  appId,
  installId,
  search = null,
  valueFilter,
}: IProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [state, setState] = useState({
    ...defaultQueryVariables,
    showSearch: false,
    formField,
  });

  let filter;
  if (search || state.search) {
    let searchFilter = {};
    const searchValue = search || state.search;
    if (valueFilter) {
      searchFilter = {
        $and: [{ ...valueFilter }, { 'values.value': { $regex: searchValue, $options: 'i' } }],
      };
    } else {
      searchFilter = { 'values.value': { $regex: searchValue, $options: 'i' } };
    }
    filter = JSON.stringify(searchFilter);
  } else if (valueFilter) {
    filter = JSON.stringify(valueFilter);
  }

  const { data, error, loading, subscribeToMore, refetch } = useQuery(GET_RESPONSES, {
    variables: {
      ...state,
      formId,
      workFlowFormResponseParentId,
      onlyMy,
      appId,
      installId,
      valueFilter: filter,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
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

export async function getResponses(formId: string, formField: string, search: string) {
  const { data } = await guestClient.query({
    query: GET_RESPONSES,
    variables: { formId, formField, search },
  });
  return data?.getResponses;
}

export function useGetResponse(_id: string): any {
  const { data, error, loading } = useQuery(GET_RESPONSE, {
    variables: { _id },
    fetchPolicy: 'cache-and-network',
  });

  useSubscription(UPDATE_RESPONSE_SUB, {
    variables: { _id: data?.getResponse?._id },
  });

  return { data, error, loading };
}

export function useGetResponseByCount(formId: string, count: number): any {
  const { data, error, loading, refetch } = useQuery(GET_RESPONSE_BY_COUNT, {
    variables: { formId, count },
    fetchPolicy: 'cache-and-network',
  });

  useSubscription(UPDATE_RESPONSE_SUB, {
    variables: { _id: data?.getResponseByCount?._id },
  });
  const { data: deleteSubData } = useSubscription(DELETED_RESPONSE);

  useEffect(() => {
    if (
      data?.getResponseByCount?._id &&
      deleteSubData?.deletedResponse === data?.getResponseByCount?._id
    ) {
      refetch();
    }
  }, [deleteSubData]);

  return { data, error, loading };
}

export async function getResponseByParentId(formId, parentId) {
  let response = null;
  const res = await apolloClient.query({
    query: GET_RESPONSES,
    variables: { ...defaultQueryVariables, limit: 1, formId, parentId },
  });
  if (res?.data?.getResponses?.data?.length > 0) {
    response = res?.data?.getResponses?.data[0];
  }
  return response;
}

export async function getResponse(_id) {
  let response = null;
  const res = await apolloClient.query({
    query: GET_RESPONSE,
    variables: { _id },
  });
  if (res?.data?.getResponse) {
    response = res?.data?.getResponse;
  }
  return response;
}

export const parseResponse = (payload) => {
  const response = { ...payload };
  if (response?.options && typeof response?.options === 'string') {
    response.options = JSON.parse(response?.options);
  }
  if (response?.values?.length > 0) {
    response.values = response?.values?.map((value) => {
      const newValue = { ...value };
      if (newValue?.options && typeof newValue?.options === 'string') {
        newValue.options = JSON.parse(newValue.options);
      }
      return newValue;
    });
  }
  return response;
};
