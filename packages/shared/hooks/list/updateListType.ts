import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_LIST_TYPE_FIELDS } from '../../graphql/mutation/list';
import { GET_LIST_TYPE_BY_SLUG } from '../../graphql/query/list';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
// import { omitTypename } from '../../utils/omitTypename';
import { stringifyPayload } from '../section/updateSection';

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
    const payload = stringifyPayload({ fields });
    updateCache(listType.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdateForm = async () => {
    try {
      const payload = stringifyPayload(listType, true);
      const res = await updateMutation({
        variables: payload,
      });
    } catch (error) {
      console.log(error);
      onAlert('Error while auto saving', error.message);
    }
  };

  return { onFieldsChange };
};
