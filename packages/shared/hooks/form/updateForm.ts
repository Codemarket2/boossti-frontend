import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_FORM } from '../../graphql/mutation/form';
import { GET_FORM_BY_SLUG } from '../../graphql/query/form';
import { IHooksProps } from '../../types/common';
import { omitTypename } from '../../utils/omitTypename';
import { client as apolloClient } from '../../graphql/index';
import { IForm } from '../../types/form';

interface IProps extends IHooksProps {
  form: IForm;
}

const updateCache = (slug, newFormData) => {
  const oldData = apolloClient.readQuery({
    query: GET_FORM_BY_SLUG,
    variables: { slug },
  });
  if (oldData?.getFormBySlug) {
    const newData = {
      ...oldData,
      getFormBySlug: { ...oldData?.getFormBySlug, ...newFormData },
    };
    apolloClient.writeQuery({
      query: GET_FORM_BY_SLUG,
      variables: { slug },
      data: newData,
    });
  }
};

export function useUpdateForm({ onAlert, form }: IProps): any {
  const [saveToServer, setSaveToServer] = useState(false);
  const [updateFormMutation, { loading: updateLoading }] = useMutation(UPDATE_FORM);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && form) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdateForm(), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [form]);

  const handleOnChange = (newForm) => {
    updateCache(form?.slug, stringifyForm({ ...form, ...newForm }));
    setSaveToServer(true);
  };

  const handleUpdateForm = async () => {
    try {
      const payload = stringifyForm(form, true);
      const res = await updateFormMutation({
        variables: payload,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      onAlert('Error while auto saving', err.message);
    }
  };

  const handleUpdateName = async (name) => {
    try {
      const payload = stringifyForm(form, true);
      const res = await updateFormMutation({
        variables: { ...payload, name },
      });
      return res?.data?.updateForm?.slug;
    } catch (err) {
      // console.log(err);
      onAlert('Error while saving form name', err.message);
    }
  };

  return { handleOnChange, updateLoading, handleUpdateForm, handleUpdateName };
}

export const stringifyForm = (form: any, removetemplate = false) => {
  let payload = { ...form };
  payload = {
    ...payload,
    fields: payload.fields.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
  };
  payload = {
    ...payload,
    fields: payload.fields.map((m) => {
      const field = { ...m };
      if (removetemplate && field?.template) {
        field.template = field?.template?._id ? field?.template?._id : null;
      }
      if (removetemplate && field?.form) {
        field.form = field?.form?._id ? field?.form?._id : null;
      }
      field.options = JSON.stringify(field.options);
      return field;
    }),
    settings: JSON.stringify(payload?.settings),
  };
  return payload;
};
