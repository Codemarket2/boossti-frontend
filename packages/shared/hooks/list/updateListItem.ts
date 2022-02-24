import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_LIST_ITEM_FIELDS } from '../../graphql/mutation/list';
import { GET_LIST_ITEM_BY_SLUG } from '../../graphql/query/list';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { stringifyPayload } from '../section/updateSection';

interface IProps extends IHooksProps {
  listItem: any;
}

export const updateCache = (slug, newListItem) => {
  const oldData = apolloClient.readQuery({
    query: GET_LIST_ITEM_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getListItemBySlug) {
    const newData = {
      ...oldData,
      getListItemBySlug: { ...oldData?.getListItemBySlug, ...newListItem },
    };
    apolloClient.writeQuery({
      query: GET_LIST_ITEM_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const useUpdateListItemFields = ({ listItem, onAlert }: IProps) => {
  const [updateMutation] = useMutation(UPDATE_LIST_ITEM_FIELDS);
  const [saveToServer, setSaveToServer] = useState(false);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && listItem) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdate(), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [listItem]);

  const onFieldsChange = (fields) => {
    const payload = stringifyPayload({ ...listItem, fields });
    updateCache(listItem.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdate = async (newListItem?: any, callback?: any) => {
    try {
      const payload = stringifyPayload(
        newListItem ? { ...listItem, ...newListItem } : listItem,
        true,
      );
      console.log({ payload });
      const res = await updateMutation({
        variables: payload,
      });
      console.log({ res });
      if (callback) {
        callback();
      }
      return true;
    } catch (error) {
      console.log(error);
      onAlert('Error while auto saving', error.message);
    }
  };

  return { onFieldsChange, handleUpdate };
};
