import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { IHooksProps } from '../../types/common';
import { IField, IFieldOptions } from '../../types/form';
import { generateObjectId } from '../../utils/objectId';

const validationSchema = yup.object().shape({
  label: yup.string().required('Label is required'),
  fieldType: yup.string().required('Field Type is required'),
  template: yup.object().when('fieldType', {
    is: (value) => value === 'template',
    then: yup.object().nullable(true).required('Template is required'),
    otherwise: yup.object().nullable(true),
  }),
  form: yup.object().when(['fieldType', 'isWidget'], {
    is: (fieldTypeValue, isWidget) =>
      (isWidget && fieldTypeValue === 'form') || fieldTypeValue === 'response',
    then: yup.object().nullable(true).required('Form is required'),
    otherwise: yup.object().nullable(true),
  }),
  // options: yup.object().shape({
  //   formField: yup.string().when('fieldType', {
  //     is: (value, con) => value === 'response',
  //     then: yup.string().required('Form field is required'),
  //     otherwise: yup.string(),
  //   }),
  //   staticText: yup.string().when('fieldType', {
  //     is: (value) => value === 'label',
  //     then: yup.string().required('Static text is required'),
  //     otherwise: yup.string(),
  //   }),
  // }),
});

const defaultOptions: IFieldOptions = {
  physicalQuantity: '',
  unit: '',
  default: false,
  selectItem: false,
  dependentRelationship: false,
  twoWayRelationship: false,
  showOptionCreatedByUser: false,
  showOptionCreatedOnTemplate: false,
  required: false,
  multipleValues: false,
  unique: false,
  caseInsensitiveUnique: false,
  staticText: '',
  formField: '',
  showCommentBox: false,
  showStarRating: false,
  notEditable: false,
  systemCalculatedAndSaved: false,
  systemValue: null,
  systemCalculatedAndView: false,
  showAsCheckbox: false,
  selectAllowCreate: false,
  selectOptions: [''],
};

interface IValues extends IField {
  isWidget: false;
}

const defaultFieldValue: IValues = {
  isWidget: false,
  _id: '',
  label: '',
  fieldType: '',
  template: null,
  form: null,
  options: defaultOptions,
};

interface ICRUDProps extends IHooksProps {
  onSave: (field: any, action: string) => void;
}

export function useAddFields({ onAlert, onSave }: ICRUDProps) {
  const [edit, setEdit] = useState(false);
  const formik = useFormik({
    initialValues: defaultFieldValue,
    validationSchema,
    onSubmit: async (payload: IValues) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // eslint-disable-next-line prefer-const
        let { isWidget, ...newPayload } = payload;
        newPayload = {
          ...payload,
          _id: edit ? payload._id : generateObjectId(),
        };
        let action = 'create';
        if (edit) {
          action = 'update';
        }
        onSave(newPayload, action);
        // formik.handleReset('');
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const setFormValues = (oldField) => {
    setEdit(true);
    const newValues: IValues = { ...defaultFieldValue };
    Object.keys(defaultFieldValue).forEach((key) => {
      if (oldField[key] !== undefined) {
        newValues[key] = oldField[key];
      }
    });
    formik.setValues(newValues);
  };

  const onOptionChange = (options?: Partial<IFieldOptions>) => {
    formik.setFieldValue('options', { ...formik.values.options, ...options });
  };

  const formLoading = formik.isSubmitting;

  return { formik, formLoading, setFormValues, onOptionChange };
}
