import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SECTION } from '../../graphql/mutation/section';
import { GET_SECTION } from '../../graphql/query/section';
import { useGetSection } from './getSection';
import { client as apolloClient } from '../../graphql';
import { omitTypename } from '../../utils/omitTypename';
import { IHooksProps } from '../../types/common';

const updateCache = (_id, newSectionData) => {
  const oldData = apolloClient.readQuery({
    query: GET_SECTION,
    variables: { _id },
  });
  if (oldData?.getSection) {
    const newData = {
      ...oldData,
      getSection: { ...oldData?.getSection, ...newSectionData },
    };
    apolloClient.writeQuery({
      query: GET_SECTION,
      variables: { _id },
      data: newData,
    });
  }
};

interface IProps extends IHooksProps {
  _id: string;
}

export function useUpdateSection({ onAlert, _id }: IProps): any {
  const { data, error, loading } = useGetSection(_id);
  const [updateMutation] = useMutation(UPDATE_SECTION);
  const [saveToServer, setSaveToServer] = useState(false);

  const section = data?.getSection;

  useEffect(() => {
    let timeOutId;
    if (saveToServer && section) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdateSection(), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [section]);

  const onSectionChange = (newSection) => {
    updateCache(_id, stringifyPayload({ ...section, ...newSection }));
    setSaveToServer(true);
  };

  const handleUpdateSection = async (newSection?: any, callback?: any) => {
    try {
      const payload = stringifyPayload(newSection ? { ...section, ...newSection } : section, true);
      const response = await updateMutation({
        variables: payload,
      });
      if (callback) {
        callback();
      }
      return response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      onAlert('Error while auto saving', err.message);
    }
  };

  return { onSectionChange, section, handleUpdateSection, error, loading };
}

export const stringifyPayload = (oldPayload: any, removeId = false) => {
  let payload = { ...oldPayload };
  if (payload?.fields) {
    payload = {
      ...payload,
      fields: payload.fields.map((m) => {
        const field = JSON.parse(JSON.stringify(m), omitTypename);
        if (field.options) {
          field.options = JSON.stringify(field.options);
        }
        if (removeId) {
          if (field?.template) {
            field.template = field?.template?._id || null;
          }
          if (field?.form) {
            field.form = field?.form?._id || null;
          }
        }
        return field;
      }),
    };
  }
  if (payload?.values) {
    payload.values = stringifyValues(payload?.values, removeId);
  }
  if (payload?.options) {
    payload = {
      ...payload,
      options: JSON.stringify(payload?.options),
    };
  }
  if (payload?.settings) {
    payload = {
      ...payload,
      settings: JSON.stringify(payload?.settings),
    };
  }
  return payload;
};

export const stringifyValues = (values, removeId = false) => {
  return values.map((m) => {
    let value = JSON.parse(JSON.stringify(m), omitTypename);
    if (removeId) {
      if (value?.template?._id) {
        value = { ...value, template: value?.template?._id || null };
      }
      if (value?.page?._id) {
        value = { ...value, page: value?.page?._id || null };
      }
      if (value?.form?._id) {
        value = { ...value, form: value?.form?._id || null };
      }
      if (value?.response?._id) {
        value = { ...value, response: value?.response?._id || null };
      }
    }
    if (value.options) {
      value.options = JSON.stringify(value.options);
    }
    const { tempMedia, tempMediaFiles, ...finalValue } = value;
    return finalValue;
  });
};
