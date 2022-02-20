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
      console.log(err);
      onAlert('Error while auto saving', err.message);
    }
  };

  return { onSectionChange, section, handleUpdateSection, error, loading };
}

export const stringifyPayload = (oldPayload: any, removeTypeId: boolean = false) => {
  let payload = { ...oldPayload };

  if (payload?.fields) {
    payload = {
      ...payload,
      fields: payload.fields.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
    };
    payload = {
      ...payload,
      fields: payload.fields.map((m) => {
        const field = { ...m };
        if (removeTypeId && field?.typeId) {
          field.typeId = field?.typeId?._id ? field?.typeId?._id : null;
        }
        if (removeTypeId && field?.form) {
          field.form = field?.form?._id ? field?.form?._id : null;
        }
        field.options = JSON.stringify(field.options);
        return field;
      }),
    };
  }
  if (payload?.values) {
    payload = {
      ...payload,
      values: payload.values.map((m) => JSON.parse(JSON.stringify(m), omitTypename)),
    };
    payload = {
      ...payload,
      values: payload.values.map((v) => {
        let value = { ...v };
        const field = payload.fields?.filter((f) => f._id === value.field)[0];
        if (field) {
          if (field.fieldType === 'type' || value?.itemId?._id) {
            value = { ...value, itemId: value?.itemId?._id ? value?.itemId?._id : null };
          }
          if (field.fieldType === 'existingForm' || value?.response?._id) {
            value = { ...value, response: value?.response?._id ? value?.response?._id : null };
          }
          // if (field.fieldType === 'image' && value?.tempMedia?.length > 0) {
          //   let newMedia = [];
          //   if (value.tempMediaFiles.length > 0) {
          //     // eslint-disable-next-line no-await-in-loop
          //     newMedia = await fileUpload(value.tempMediaFiles, '/form-response');
          //   }
          //   if (newMedia?.length > 0) {
          //     newMedia = newMedia.map((n, i) => ({ url: n, caption: value?.tempMedia[i].caption }));
          //     value.media = newMedia;
          //   }
          // }
          const { tempMedia, tempMediaFiles, ...finalValue } = value;
          return finalValue;
        }
        return value;
      }),
    };
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
