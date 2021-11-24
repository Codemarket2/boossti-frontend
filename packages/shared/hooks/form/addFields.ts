import * as yup from 'yup';
import { useFormik } from 'formik';
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
});

interface IFormValues {
  _id: string;
  edit: boolean;
  parentId: string;
  label: string;
  fieldType: string;
  typeId: any;
  multipleValues: boolean;
  required: boolean;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  parentId: '',
  label: '',
  fieldType: '',
  typeId: null,
  multipleValues: false,
  required: false,
};

interface ICRUDProps extends IHooksProps {
  onSave: (field: any, action: string) => void;
}

export function useAddFields({ onAlert, onSave }: ICRUDProps): any {
  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        const newPayload = {
          _id: payload.edit ? payload._id : generateObjectId(),
          label: payload.label,
          fieldType: payload.fieldType,
          options: {
            multipleValues: payload.multipleValues,
            required: payload.required,
          },
          typeId: payload.typeId,
        };
        let action = 'create';
        if (payload.edit) {
          action = 'update';
        }
        formik.handleReset('');
        onSave(newPayload, action);
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const setFormValues = (field) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('label', field.label, false);
    formik.setFieldValue('fieldType', field.fieldType, false);
    formik.setFieldValue('multipleValues', field.options.multipleValues, false);
    formik.setFieldValue('required', field.options.required, false);
    formik.setFieldValue('typeId', field.typeId, false);
    formik.setFieldValue('_id', field._id, false);
  };

  const formLoading = formik.isSubmitting;

  return { formik, formLoading, setFormValues };
}
