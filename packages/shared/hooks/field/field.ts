import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GET_FIELDS_BY_TYPE, GET_FIELD_BY_RELATION_ID } from '../../graphql/query/field';
import { client as apolloClient } from '../../graphql';
import {
  CREATE_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  UPDATE_FIELD_POSITION,
} from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';
import { ADDED_FIELD } from '../../graphql/subscription/field';
import { generateObjectId } from '@frontend/shared/utils/objectId';

export const defaultQueryVariables = { limit: 1000, page: 1 };

export function useGetFieldsByType({ parentId }: any) {
  const [subscribed, setSubscribed] = useState(false);
  const { data, error, loading, subscribeToMore } = useQuery(GET_FIELDS_BY_TYPE, {
    variables: { ...defaultQueryVariables, parentId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: ADDED_FIELD,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newField = subscriptionData.data.addedField;
          let isNew = true;
          let newData = prev?.getFieldsByType?.data?.map((t) => {
            if (t._id === newField._id) {
              isNew = false;
              return newField;
            }
            return t;
          });
          if (isNew) {
            newData = [...prev?.getFieldsByType?.data, newField];
          }
          newData = newData.filter((d) => d.parentId !== parentId);
          return {
            ...prev,
            getFieldsByType: {
              ...prev.getFieldsByType,
              data: newData,
            },
          };
        },
      });
    }
  }, []);

  return { data, error, loading };
}

const validationSchema = yup.object({
  label: yup.string().required('Label is required'),
  fieldType: yup.string().required('Select Field Type'),
  typeId: yup.object().when('fieldType', {
    is: (value) => value === 'type',
    then: yup.object().nullable(true).required('Type is required'),
    otherwise: yup.object().nullable(true),
  }),
  fieldLabel: yup.string().when('fieldType', {
    is: (value) => value === 'type',
    then: yup.string().required('Required'),
    otherwise: yup.string().nullable(true),
  }),
});

interface IFormValues {
  _id: string;
  edit: boolean;
  parentId: string;
  label: string;
  fieldType: string;
  typeId: any;
  multipleValues: boolean;
  oneUserMultipleValues: boolean;
  fieldLabel: string;
  relationId?: string;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  parentId: '',
  label: '',
  fieldType: '',
  typeId: null,
  multipleValues: false,
  oneUserMultipleValues: false,
  fieldLabel: '',
  relationId: '',
};

interface ICRUDProps extends IHooksProps {
  parentId: any;
  createCallback: () => void;
}

export function useGetFieldByRelationId(relationId) {
  const { data, error, loading } = useQuery(GET_FIELD_BY_RELATION_ID, {
    variables: {
      relationId,
    },
  });
  return {
    data,
    error,
    loading,
  };
}
export function useCRUDFields({ onAlert, parentId, createCallback }: ICRUDProps) {
  const [createFieldMutation, { loading: createLoading }] = useMutation(CREATE_FIELD);
  const [updateFieldMutation, { loading: updateLoading }] = useMutation(UPDATE_FIELD);
  const formik = useFormik({
    initialValues: { ...defaultFormValues, parentId },
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        let newPayload = payload;
        if (newPayload.typeId && newPayload.typeId._id) {
          newPayload = { ...newPayload, typeId: newPayload.typeId._id };
        }
        if (newPayload.edit) {
          const updateRes = await onUpdate(newPayload);
          console.log('updateRes', updateRes);
        } else {
          await onCreate(newPayload);
        }
        createCallback();
        formik.handleReset('');
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const onCreate = async (payload) => {
    const updateCache = (client, mutationResult) => {
      const { getFieldsByType } = client.readQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
      });
      const newData = {
        getFieldsByType: {
          ...getFieldsByType,
          data: [...getFieldsByType.data, mutationResult.data.createField],
        },
      };
      client.writeQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
        data: newData,
      });
    };
    let newPayload = { ...payload };
    newPayload._id = generateObjectId();
    if (newPayload.fieldType === 'type') {
      const relationPayload: any = {
        parentId: newPayload.typeId,
        label: newPayload.fieldLabel,
        fieldType: newPayload.fieldType,
        typeId: newPayload.parentId,
        relationId: newPayload._id,
        fieldLabel: newPayload.label,
      };
      relationPayload._id = generateObjectId();
      newPayload.relationId = relationPayload._id;
      const response = await createFieldMutation({
        variables: relationPayload,
      });
    }
    return await createFieldMutation({
      variables: newPayload,
      update: updateCache,
    });
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const { getFieldsByType } = client.readQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
      });
      const newData = {
        getFieldsByType: {
          ...getFieldsByType,
          data: getFieldsByType.data.map((f) =>
            f._id === mutationResult.data.updateField._id
              ? { ...f, ...mutationResult.data.updateField }
              : f,
          ),
        },
      };
      client.writeQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
        data: newData,
      });
    };
    let newPayload = { ...payload };

    if (newPayload.fieldType === 'type') {
      const relationPayload: any = {
        _id: newPayload.relationId,
        parentId: newPayload.typeId,
        label: newPayload.fieldLabel,
        fieldType: newPayload.fieldType,
        typeId: newPayload.parentId,
        fieldLabel: newPayload.label,
      };
      if (payload.relationId) {
        relationPayload._id = payload.relationId;
      }
      const response = await updateFieldMutation({
        variables: relationPayload,
      });
      newPayload.relationId = response?.data?.updateField?._id;
    }

    return await updateFieldMutation({
      variables: newPayload,
      update: updateInCache,
    });
  };

  const setFormValues = (field) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('label', field.label, false);
    formik.setFieldValue('fieldLabel', field.fieldLabel, false);
    formik.setFieldValue('fieldType', field.fieldType, false);
    formik.setFieldValue('multipleValues', field.multipleValues, false);
    formik.setFieldValue('oneUserMultipleValues', field.oneUserMultipleValues, false);
    formik.setFieldValue('typeId', field.typeId, false);
    formik.setFieldValue('_id', field._id, false);
    formik.setFieldValue('relationId', field.relationId, false);
  };

  const formLoading = createLoading || updateLoading || formik.isSubmitting;

  return { formik, formLoading, setFormValues };
}

interface IDeleteProps extends IHooksProps {
  parentId: any;
}

export function useUpdateFieldPosition({ onAlert, parentId }: IDeleteProps) {
  const [updateFieldPositionMutation, { loading: updateLoading }] = useMutation(
    UPDATE_FIELD_POSITION,
  );
  const updatePositionInCache = async (newFields) => {
    const { getFieldsByType } = await apolloClient.readQuery({
      query: GET_FIELDS_BY_TYPE,
      variables: { ...defaultQueryVariables, parentId },
    });
    const newData = {
      getFieldsByType: {
        ...getFieldsByType,
        data: newFields,
      },
    };
    apolloClient.writeQuery({
      query: GET_FIELDS_BY_TYPE,
      variables: { ...defaultQueryVariables, parentId },
      data: newData,
    });
  };

  const handleUpdatePosition = async (_id: any, position: number) => {
    try {
      const res = await updateFieldPositionMutation({
        variables: { _id, position },
      });
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleUpdatePosition, updateLoading, updatePositionInCache };
}

export function useDeleteField({ onAlert, parentId }: IDeleteProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD);
  const handleDelete = async (_id: any, relationId: any, deleteCallBack: any) => {
    try {
      const deleteInCache = (client) => {
        const { getFieldsByType } = client.readQuery({
          query: GET_FIELDS_BY_TYPE,
          variables: { ...defaultQueryVariables, parentId },
        });
        const newData = {
          getFieldsByType: {
            ...getFieldsByType,
            data: getFieldsByType.data.filter((f) => f._id !== _id),
          },
        };
        client.writeQuery({
          query: GET_FIELDS_BY_TYPE,
          variables: { ...defaultQueryVariables, parentId },
          data: newData,
        });
      };
      await deleteFieldMutation({
        variables: { _id: relationId },
        update: deleteInCache,
      });
      await deleteFieldMutation({
        variables: { _id },
        update: deleteInCache,
      });
      deleteCallBack();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
