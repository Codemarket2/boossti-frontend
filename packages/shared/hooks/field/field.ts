import { useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GET_FIELDS_BY_TYPE } from '../../graphql/query/field';
import { CREATE_FIELD, UPDATE_FIELD, DELETE_FIELD } from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';

const defaultQueryVariables = { limit: 1000, page: 1 };

export function useGetFieldsByType({ parentId }: any) {
  const { data, error, loading } = useQuery(GET_FIELDS_BY_TYPE, {
    variables: { ...defaultQueryVariables, parentId },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
}

const validationSchema = yup.object({
  label: yup.string().required('Label is required'),
  fieldType: yup.string().required('Select Field Type'),
});

interface IFormValues {
  _id: string;
  edit: boolean;
  parentId: string;
  label: string;
  fieldType: string;
  typeId: any;
  multipleValues: boolean;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  parentId: '',
  label: '',
  fieldType: '',
  typeId: null,
  multipleValues: true,
};

interface ICRUDProps extends IHooksProps {
  parentId: any;
  createCallback: () => void;
}

export function useCRUDFields({ onAlert, parentId, createCallback }: ICRUDProps) {
  const [createFieldMutation, { loading: createLoading }] = useMutation(CREATE_FIELD);
  const [updateFieldMutation, { loading: updateLoading }] = useMutation(UPDATE_FIELD);

  const formik = useFormik({
    initialValues: { ...defaultFormValues, parentId },
    validationSchema: validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        let newPayload = payload;
        if (newPayload.typeId && newPayload.typeId._id) {
          newPayload.typeId = newPayload.typeId._id;
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
    return await createFieldMutation({
      variables: payload,
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
            f._id === mutationResult.data.updateField._id ? mutationResult.data.updateField : f,
          ),
          // data: [...getFieldsByType.data, mutationResult.data.createField],
        },
      };
      client.writeQuery({
        query: GET_FIELDS_BY_TYPE,
        variables: { ...defaultQueryVariables, parentId },
        data: newData,
      });
    };
    return await updateFieldMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const setFormValues = (field) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('label', field.label, false);
    formik.setFieldValue('fieldType', field.fieldType, false);
    formik.setFieldValue('multipleValues', field.multipleValues, false);
    formik.setFieldValue('typeId', field.typeId, false);
    formik.setFieldValue('_id', field._id, false);
  };

  const formLoading = createLoading || updateLoading || formik.isSubmitting;

  return { formik, formLoading, setFormValues };
}

interface IDeleteProps extends IHooksProps {
  parentId: any;
}

export function useDeleteField({ onAlert, parentId }: IDeleteProps) {
  const [deleteFieldMutation, { loading: deleteLoading }] = useMutation(DELETE_FIELD);
  const handleDelete = async (_id: any, deleteCallBack: any) => {
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
