import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';
import { generateObjectId } from '../../utils/objectId';

const validationSchema = yup.object({
  label: yup.string().required('Label is required'),
  fieldType: yup.string().required('Field Type is required'),
  template: yup.object().when('fieldType', {
    is: (value) => value === 'template',
    then: yup.object().nullable(true).required('Template is required'),
    otherwise: yup.object().nullable(true),
  }),
  form: yup.object().when('fieldType', {
    is: (value) => value === 'form',
    then: yup.object().nullable(true).required('Select Form is required'),
    otherwise: yup.object().nullable(true),
  }),
  // formField: yup.string().when('fieldType', {
  //   is: (value) => value === 'existingForm',
  //   then: yup.string().required('Form Field is required'),
  //   otherwise: yup.string(),
  // }),
  staticText: yup.string().when('fieldType', {
    is: (value) => value === 'label',
    then: yup.string().required('Static text is required'),
    otherwise: yup.string(),
  }),
});

interface IFormValues {
  _id: string;
  edit: boolean;
  parentId: string;
  label: string;
  fieldType: string;
  multipleValues: boolean;
  required: boolean;
  template: any;
  form: any;
  formField: string;
  staticText: string;
}

const defaultFormValues = {
  _id: '',
  edit: false,
  parentId: '',
  label: '',
  fieldType: '',
  multipleValues: false,
  required: false,
  template: null,
  form: null,
  formField: '',
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
          template: payload.template,
          form: payload.form,
          options: {
            multipleValues: payload.multipleValues,
            required: payload.required,
            formField: payload.formField,
            staticText: payload.staticText,
          },
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
    formik.setFieldValue('required', field.options?.required, false);
    formik.setFieldValue('_id', field._id, false);
    formik.setFieldValue('staticText', field.options?.staticText, false);
    formik.setFieldValue('template', field?.template, false);
    formik.setFieldValue('form', field?.form, false);
    // formik.setFieldValue('formField', field.options?.formField, false);
  };

  const formLoading = formik.isSubmitting;

  return { formik, formLoading, setFormValues };
}
