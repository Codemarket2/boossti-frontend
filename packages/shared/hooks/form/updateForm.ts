import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_FORM } from '../../graphql/mutation/form';
import { GET_FORM } from '../../graphql/query/form';
import { IHooksProps } from '../../types/common';
import { useGetForm } from './index';
import { omitTypename } from '../../utils/omitTypename';

interface IProps extends IHooksProps {
  _id: string;
}

export function useUpdateForm({ onAlert, _id }: IProps): any {
  const [state, setState] = useState(null);
  const [saveToServer, setSaveToServer] = useState(false);
  const { data, error } = useGetForm(_id);
  const [updateFormMutation, { loading: updateLoading }] = useMutation(UPDATE_FORM);

  useEffect(() => {
    let timeOutId;
    if (state && !saveToServer) {
      setSaveToServer(true);
    } else if (state && saveToServer) {
      timeOutId = setTimeout(() => handleUpdateForm(), 1000);
    }
    return () => clearTimeout(timeOutId);
  }, [state]);

  useEffect(() => {
    if (data && data.getForm && !state) {
      setState(data.getForm);
    }
  }, [data]);

  const updateCache = (client, mutationResult) => {
    const { getForm } = client.readQuery({
      query: GET_FORM,
      variables: { _id },
    });
    if (getForm) {
      const newData = {
        getForm: mutationResult.data.updateForm,
      };
      client.writeQuery({
        query: GET_FORM,
        variables: { _id },
        data: newData,
      });
    }
  };

  const handleUpdateForm = async () => {
    let payload = { ...state };
    payload = {
      ...payload,
      fields: payload.fields.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
    };
    payload = {
      ...payload,
      fields: payload.fields.map((m) => {
        const field = { ...m };
        if (field.fieldType === 'type') {
          field.typeId = field.typeId ? field.typeId._id : null;
        }
        field.options = JSON.stringify(field.options);
        return field;
      }),
      settings: JSON.stringify(payload.settings),
    };
    try {
      // const res =
      await updateFormMutation({
        variables: payload,
        update: updateCache,
      });
      // console.log('update res', res);
    } catch (error) {
      console.log(error);
      onAlert('Error', error.message);
    }
  };

  return { state, setState, error, updateLoading, handleUpdateForm };
}
