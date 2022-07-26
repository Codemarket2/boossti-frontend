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

export function useUpdateForm({ onAlert, form }: IProps) {
  const [saveToServer, setSaveToServer] = useState(false);
  const [updateFormMutation, { loading: updateLoading }] = useMutation<
    { updateForm: IForm },
    IForm
  >(UPDATE_FORM);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && form) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdateForm(form), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [form]);

  const handleOnChange = (newForm) => {
    updateCache(form?.slug, stringifyForm({ ...form, ...newForm }));
    setSaveToServer(true);
  };

  const handleUpdateForm = async (newForm: Partial<IForm> = {}) => {
    try {
      const payload = stringifyForm({ ...form, ...newForm }, true);
      const res = await updateFormMutation({
        variables: payload,
      });
      return res?.data?.updateForm;
    } catch (err) {
      // console.log(err);
      onAlert('Error while saving form name', err.message);
    }
  };

  return { handleOnChange, updateLoading, handleUpdateForm };
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
