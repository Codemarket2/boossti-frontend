import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_FORM } from '../../graphql/mutation/form';
import { GET_FORM } from '../../graphql/query/form';
import { IHooksProps } from '../../types/common';
import { useGetForm } from './index';
import { omitTypename } from '../../utils/omitTypename';
import { client as apolloClient } from '../../graphql/index';

interface IProps extends IHooksProps {
  _id: string;
}

const updateCache = (_id, newFormData) => {
  const oldData = apolloClient.readQuery({
    query: GET_FORM,
    variables: { _id },
  });
  if (oldData?.getForm) {
    const newData = {
      ...oldData,
      getForm: { ...oldData?.getForm, ...newFormData },
    };
    apolloClient.writeQuery({
      query: GET_FORM,
      variables: { _id },
      data: newData,
    });
  }
};

export function useUpdateForm({ onAlert, _id }: IProps): any {
  const { data, error } = useGetForm(_id);
  const [saveToServer, setSaveToServer] = useState(false);
  const [updateFormMutation, { loading: updateLoading }] = useMutation(UPDATE_FORM);

  const form = data?.getForm;

  useEffect(() => {
    let timeOutId;
    if (saveToServer && form) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdateForm(), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [form]);

  const handleOnChange = (newState) => {
    updateCache(_id, stringifyForm({ ...form, ...newState }));
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
      onAlert('Error while auto saving', err.message);
    }
  };

  return { state: form, handleOnChange, error, updateLoading, handleUpdateForm, handleUpdateName };
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
