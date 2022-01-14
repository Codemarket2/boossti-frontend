import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_LIST_TYPE_FIELDS } from '../../graphql/mutation/list';
import { GET_LIST_TYPE_BY_SLUG } from '../../graphql/query/list';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';

interface IProps extends IHooksProps {
  listType: any;
}

const updateCache = (slug, newListType) => {
  const oldData = apolloClient.readQuery({
    query: GET_LIST_TYPE_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getListTypeBySlug) {
    const newData = {
      ...oldData,
      getListTypeBySlug: { ...oldData?.getListTypeBySlug, ...newListType },
    };
    apolloClient.writeQuery({
      query: GET_LIST_TYPE_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const useUpdateListType = ({ listType, onAlert }: IProps) => {
  const [updateMutation] = useMutation(UPDATE_LIST_TYPE_FIELDS);
  const [saveToServer, setSaveToServer] = useState(false);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && listType) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdateForm(), 1000);
    }
    return () => clearTimeout(timeOutId);
  }, [listType]);

  const onFieldsChange = (fields) => {
    const payload = stringifyListType({ fields });
    updateCache(listType.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdateForm = async () => {
    try {
      const payload = stringifyListType(listType, true);
      const res = await updateMutation({
        variables: payload,
      });
      console.log('res', res);
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
      if (removeTypeId) {
        field.typeId = field.typeId ? field.typeId._id : null;
      }
      field.options = JSON.stringify(field.options);
      return field;
    }),
  };
  return payload;
};
