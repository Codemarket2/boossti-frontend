import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TEMPLATE_FIELDS } from '../../graphql/mutation/template';
import { GET_TEMPLATE_BY_SLUG } from '../../graphql/query/template';
import { client as apolloClient } from '../../graphql';
import { IHooksProps } from '../../types/common';
// import { omitTypename } from '../../utils/omitTypename';
import { stringifyPayload } from '../section/updateSection';

interface IProps extends IHooksProps {
  template: any;
}

const updateCache = (slug, newTemplate) => {
  const oldData = apolloClient.readQuery({
    query: GET_TEMPLATE_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getTemplateBySlug) {
    const newData = {
      ...oldData,
      getTemplateBySlug: { ...oldData?.getTemplateBySlug, ...newTemplate },
    };
    apolloClient.writeQuery({
      query: GET_TEMPLATE_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export const useUpdateTemplate = ({ template, onAlert }: IProps) => {
  const [updateMutation] = useMutation(UPDATE_TEMPLATE_FIELDS);
  const [saveToServer, setSaveToServer] = useState(false);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && template) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdate(), 1000);
    }
    return () => clearTimeout(timeOutId);
  }, [template]);

  const onTemplateChange = (newTemplate) => {
    const payload = stringifyPayload({ ...template, ...newTemplate });
    updateCache(template.slug, payload);
    setSaveToServer(true);
  };

  const handleUpdate = async () => {
    try {
      const payload = stringifyPayload(template, true);
      const res = await updateMutation({
        variables: payload,
      });
    } catch (error) {
      console.log(error);
      onAlert('Error while auto saving', error.message);
    }
  };

  return { onTemplateChange };
};
