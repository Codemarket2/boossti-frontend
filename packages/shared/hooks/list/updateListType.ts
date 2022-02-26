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
      timeOutId = setTimeout(() => handleUpdate(), 1000);
    }
    return () => clearTimeout(timeOutId);
  }, [listType]);

  const onListTypeChange = (newListType) => {
    const payload = stringifyPayload({ ...listType, ...newListType });
    updateCache(listType.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdate = async () => {
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

  return { onListTypeChange };
};
