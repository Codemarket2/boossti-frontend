import { useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';
import { GET_FIELD_VALUES_BY_FIELD } from '../../graphql/query/field';
import {
  CREATE_FIELD_VALUE,
  UPDATE_FIELD_VALUE,
  DELETE_FIELD_VALUE,
} from '../../graphql/mutation/field';

const defaultQueryVariables = { limit: 1000, page: 1 };

export function useGetFieldValuesByField({ field }: any) {
  const { data, error, loading } = useQuery(GET_FIELD_VALUES_BY_FIELD, {
    variables: { ...defaultQueryVariables, field },
    fetchPolicy: 'cache-and-network',
  });
  // console.log('data, error, loading', data, error, loading);
  return { data, error, loading };
}

const validationSchema = yup.object({
  fieldType: yup.string(),
  itemId: yup.object().when('fieldType', {
    is: (value) => value === 'type',
    then: yup.object().nullable(true).required('Value is required'),
    otherwise: yup.object().nullable(true),
  }),
  value: yup.string().when('fieldType', {
    is: (value) => value === 'string',
    then: yup.string().nullable(true).required('Value is required'),
    otherwise: yup.string().nullable(true),
  }),
});

interface IFormValues {
  _id: string;
  edit: boolean;
  fieldType: string;
  field: string;
  value: string;
  itemId: any;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  fieldType: 'string',
  field: '',
  value: '',
  itemId: null,
};

interface ICRUDProps extends IHooksProps {
  field: string;
  fieldType: string;
  createCallback: () => void;
}

export function useCRUDFieldValue({ onAlert, field, fieldType, createCallback }: ICRUDProps) {
  const [createFieldValueMutation, { loading: createLoading }] = useMutation(CREATE_FIELD_VALUE);
  const [updateFieldValueMutation, { loading: updateLoading }] = useMutation(UPDATE_FIELD_VALUE);

  const formik = useFormik({
    initialValues: { ...defaultFormValues, field, fieldType },
    validationSchema: validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        let newPayload = payload;
        if (newPayload.itemId && newPayload.itemId._id) {
          newPayload.itemId = newPayload.itemId._id;
        }
        if (newPayload.edit) {
          await onUpdate(newPayload);
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
      const { getFieldValuesByField } = client.readQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: { ...defaultQueryVariables, field },
      });
      const newData = {
        getFieldValuesByField: {
          ...getFieldValuesByField,
          data: [...getFieldValuesByField.data, mutationResult.data.createFieldValue],
        },
      };
      client.writeQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: { ...defaultQueryVariables, field },
        data: newData,
      });
    };
    return await createFieldValueMutation({
      variables: payload,
      update: updateCache,
    });
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const { getFieldValuesByField } = client.readQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: { ...defaultQueryVariables, field },
      });
      const newData = {
        getFieldValuesByField: {
          ...getFieldValuesByField,
          data: getFieldValuesByField.data.map((f) =>
            f._id === mutationResult.data.updateFieldValue._id
              ? mutationResult.data.updateFieldValue
              : f,
          ),
        },
      };
      client.writeQuery({
        query: GET_FIELD_VALUES_BY_FIELD,
        variables: { ...defaultQueryVariables, field },
        data: newData,
      });
    };
    return await updateFieldValueMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const setFormValues = (fieldValue) => {
    formik.setFieldValue('_id', fieldValue._id, false);
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('field', fieldValue.field, false);
    formik.setFieldValue('value', fieldValue.value, false);
    formik.setFieldValue('itemId', fieldValue.itemId, false);
  };

  const formLoading = createLoading || updateLoading || formik.isSubmitting;

  return { formik, formLoading, setFormValues };
}

interface IDeleteProps extends IHooksProps {
  field: any;
}

export function useDeleteFieldValue({ onAlert, field }: IDeleteProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD_VALUE);
  const handleDelete = async (_id: any, deleteCallBack: any) => {
    try {
      const deleteInCache = (client) => {
        const { getFieldValuesByField } = client.readQuery({
          query: GET_FIELD_VALUES_BY_FIELD,
          variables: { ...defaultQueryVariables, field },
        });
        const newData = {
          getFieldValuesByField: {
            ...getFieldValuesByField,
            data: getFieldValuesByField.data.filter((f) => f._id !== _id),
          },
        };
        client.writeQuery({
          query: GET_FIELD_VALUES_BY_FIELD,
          variables: { ...defaultQueryVariables, field },
          data: newData,
        });
      };
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
