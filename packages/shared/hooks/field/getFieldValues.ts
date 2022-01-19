import { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_FIELD_VALUES } from '../../graphql/query/field';
import { ADDED_FIELD_VALUE, DELETE_FIELD_VALUE_SUB } from '../../graphql/subscription/field';
import { client as apolloClient } from '../../graphql';

export const defaultQueryVariables = { limit: 1000, page: 1 };

const deleteInCache = (_id: string, parentId: string, field: string) => {
  const oldData = apolloClient.readQuery({
    query: GET_FIELD_VALUES,
    variables: { ...defaultQueryVariables, parentId, field },
  });
  const getFieldValues = { data: [], count: 0 };
  if (oldData?.getFieldValues?.data) {
    getFieldValues.data = oldData?.getFieldValues?.data;
  }
  getFieldValues?.data?.filter((f) => f._id !== _id);
  apolloClient.writeQuery({
    query: GET_FIELD_VALUES,
    variables: { ...defaultQueryVariables, parentId, field },
    data: { getFieldValues },
  });
};

export function useGetFieldValues({ parentId, field }: any) {
  const [subscribed, setSubscribed] = useState(false);
  const { data, error, loading, subscribeToMore } = useQuery(GET_FIELD_VALUES, {
    variables: { ...defaultQueryVariables, parentId, field },
    fetchPolicy: 'cache-and-network',
  });

  const { data: deleteSubData } = useSubscription(DELETE_FIELD_VALUE_SUB);

  useEffect(() => {
    if (deleteSubData?.deleteFieldValueSub) {
      deleteInCache(deleteSubData?.deleteFieldValueSub, parentId, field);
    }
  }, [deleteSubData]);

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: ADDED_FIELD_VALUE,
        variables: {
          parentId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFieldValue = subscriptionData.data.addedFieldValue;
          if (field === newFieldValue.field) {
            let isNew = true;
            let newData = prev?.getFieldValues?.data?.map((t) => {
              if (t._id === newFieldValue._id) {
                isNew = false;
                return newFieldValue;
              }
              return t;
            });
            if (isNew) {
              newData = [...prev?.getFieldValues?.data, newFieldValue];
            }
            newData = newData.filter((d) => d.parentId === parentId);
            return {
              ...prev,
              getFieldValues: {
                ...prev.getFieldValues,
                data: newData,
              },
            };
          }
          return prev;
        },
      });
    }
  }, []);

  return { data, error, loading };
}
