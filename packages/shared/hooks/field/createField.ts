import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GET_FIELDS } from '../../graphql/query/field';
import { CREATE_FIELD, UPDATE_FIELD } from '../../graphql/mutation/field';
import { IHooksProps } from '../../types/common';
import { generateObjectId } from '../../utils/objectId';

const validationSchema = yup.object({
  label: yup.string().required('Label is required'),
  fieldType: yup.string().required('Select Field Type'),
  typeId: yup.object().when('fieldType', {
    is: (value) => value === 'type',
    then: yup.object().nullable(true).required('Type is required'),
    otherwise: yup.object().nullable(true),
  }),
  relationLabel: yup.string().when('fieldType', {
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
  relationLabel: string;
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
  relationLabel: '',
  relationId: null,
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
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        let newPayload = payload;
        if (newPayload.typeId && newPayload.typeId._id) {
          newPayload = { ...newPayload, typeId: newPayload.typeId._id };
        }
        if (newPayload.edit) {
          const updateRes = await onUpdate(newPayload);
          // console.log('updateRes', updateRes);
        } else {
          await onCreate(newPayload);
        }
        formik.handleReset('');
        createCallback();
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const onCreate = async (oldPayload) => {
    const updateCache = (client, mutationResult) => {
      const oldData = client.readQuery({
        query: GET_FIELDS,
        variables: { parentId },
      });
      let getFields = [];
      if (oldData?.getFields) {
        getFields = oldData?.getFields;
      }
      let isPresent = false;
      let newData = { getFields };
      getFields.forEach((f) => {
        if (f._id === mutationResult?.data?.createField?._id) {
          isPresent = true;
        }
      });
      if (!isPresent) {
        newData = {
          getFields: [...getFields, mutationResult.data.createField],
        };
      }
      client.writeQuery({
        query: GET_FIELDS,
        variables: { parentId },
        data: newData,
      });
    };
    const payload = { ...oldPayload };
    payload._id = generateObjectId();
    if (payload.fieldType === 'type') {
      const relationPayload: any = {
        parentId: payload.typeId,
        label: payload.relationLabel,
        fieldType: payload.fieldType,
        typeId: payload.parentId,
        relationId: payload._id,
      };
      relationPayload._id = generateObjectId();
      payload.relationId = relationPayload._id;
      const response2 = await createFieldMutation({
        variables: relationPayload,
      });
    }
    const response = await createFieldMutation({
      variables: payload,
      update: updateCache,
    });
    return response;
  };

  const onUpdate = async (oldPayload) => {
    const updateInCache = (client, mutationResult) => {
      const oldData = client.readQuery({
        query: GET_FIELDS,
        variables: { parentId },
      });
      let getFields = [];
      if (oldData?.getFields) {
        getFields = oldData?.getFields;
      }
      const newData = {
        getFields: getFields.map((f) =>
          f._id === mutationResult.data.updateField._id
            ? { ...f, ...mutationResult.data.updateField }
            : f,
        ),
      };
      client.writeQuery({
        query: GET_FIELDS,
        variables: { parentId },
        data: newData,
      });
    };
    const payload = { ...oldPayload };

    if (payload.fieldType === 'type') {
      const relationPayload: any = {
        _id: payload?.relationId,
        parentId: payload.typeId,
        label: payload.relationLabel,
        fieldType: payload.fieldType,
        typeId: payload.parentId,
        relationId: payload._id,
      };
      if (payload.relationId) {
        const response2 = await updateFieldMutation({
          variables: relationPayload,
        });
      } else {
        relationPayload._id = generateObjectId();
        payload.relationId = relationPayload._id;
        const response2 = await createFieldMutation({
          variables: relationPayload,
        });
      }
    }
    const response = await updateFieldMutation({
      variables: payload,
      update: updateInCache,
    });
    return response;
  };

  const setFormValues = (field) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('label', field.label, false);
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
