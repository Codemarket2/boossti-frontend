import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PAGE_FIELDS } from '../../graphql/mutation/template';
import { GET_PAGE_BY_SLUG } from '../../graphql/query/template';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
import { stringifyPayload } from '../section/updateSection';

interface IProps extends IHooksProps {
  page: any;
}

export const updateCache = (slug, newPage) => {
  const oldData = apolloClient.readQuery({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getPageBySlug) {
    const newData = {
      ...oldData,
      getPageBySlug: { ...oldData?.getPageBySlug, ...newPage },
    };
    apolloClient.writeQuery({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const useUpdatePageFields = ({ page, onAlert }: IProps) => {
  const [updateMutation] = useMutation(UPDATE_PAGE_FIELDS);
  const [saveToServer, setSaveToServer] = useState(false);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && page) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdate(), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [page]);

  const onPageChange = (newPage) => {
    const payload = stringifyPayload({ ...page, ...newPage });
    updateCache(page.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdate = async (newPage?: any, callback?: any) => {
    try {
      const payload = stringifyPayload(newPage ? { ...page, ...newPage } : page, true);
      const res = await updateMutation({
        variables: payload,
      });
      if (callback) {
        callback();
      }
      return true;
    } catch (error) {
      console.log(error);
      onAlert('Error while auto saving', error.message);
    }
  };

  return { onPageChange, handleUpdate };
};
