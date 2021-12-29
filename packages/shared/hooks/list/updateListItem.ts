import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_LIST_ITEM_FIELDS } from '../../graphql/mutation/list';
import { GET_LIST_ITEM_BY_SLUG } from '../../graphql/query/list';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';

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
    const payload = stringifyListType({ fields });
    updateCache(listItem.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdate = async () => {
    try {
      const payload = stringifyListType(listItem, true);
      await updateMutation({
        variables: payload,
      });
    } catch (error) {
      console.log(error);
      onAlert('Error while auto saving', error.message);
    }
  };

  return { onFieldsChange };
};

export const stringifyListType = (lisType: any, removeTypeId: boolean = false) => {
  let payload = { ...lisType };
  payload = {
    ...payload,
    fields: payload.fields.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
  };
  payload = {
    ...payload,
    fields: payload.fields.map((m) => {
      const field = { ...m };
      if (removeTypeId && field.fieldType === 'type') {
        field.typeId = field.typeId ? field.typeId._id : null;
      }
      field.options = JSON.stringify(field.options);
      return field;
    }),
  };
  return payload;
};
