import { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_FIELDS, GET_FIELD } from '../../graphql/query/field';
import { ADDED_FIELD, DELETE_FIELD_SUB } from '../../graphql/subscription/field';
import { client as apolloClient } from '../../graphql';

const deleteInCache = (_id: string, parentId: string) => {
  const oldData = apolloClient.readQuery({
    query: GET_FIELDS,
    variables: { parentId },
  });
  let getFields = [];
  if (oldData?.getFields) {
    getFields = oldData?.getFields;
  }
  const newData = {
    getFields: getFields.filter((f) => f._id !== _id),
  };
  apolloClient.writeQuery({
    query: GET_FIELDS,
    variables: { parentId },
    data: newData,
  });
};

export function useGetFields(parentId: string) {
  const [subscribed, setSubscribed] = useState(false);
  const { data, error, loading, subscribeToMore } = useQuery(GET_FIELDS, {
    variables: { parentId },
  });
  const { data: deleteSubData } = useSubscription(DELETE_FIELD_SUB);
  useEffect(() => {
    if (deleteSubData?.deleteFieldSub) {
      deleteInCache(deleteSubData?.deleteFieldSub, parentId);
    }
  }, [deleteSubData]);

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: ADDED_FIELD,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newField = subscriptionData.data.addedField;
          let isNew = true;
          let newData = prev?.getFields?.map((t) => {
            if (t._id === newField._id) {
              isNew = false;
              return newField;
            }
            return t;
          });
          if (isNew) {
            newData = [...prev?.getFields, newField];
          }
          newData = newData.filter((d) => d.parentId === parentId);
          return { getFields: newData };
        },
      });
    }
  }, []);

  return { data, error, loading };
}

export function useGetField(_id: string) {
  const { data, error, loading } = useQuery(GET_FIELD, {
    variables: {
      _id,
    },
  });
  return {
    data,
    error,
    loading,
  };
}
