import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';

const validationSchema = yup.object({
  name: yup.string().label('Constraint name').required(),
  constraintType: yup.string().label('Constraint Type').required(),
  fields: yup.array(yup.string().required()).min(1, 'At least one field is required'),
  reactGridLayoutEditor: yup.string().label('ReactGridLayoutEditor').required(),
});

interface IValues {
  name: string;
  constraintType: string;
  fields: any;
}

const defaultValues = {
  name: '',
  constraintType: '',
  fields: [''],
  reactGridLayoutEditor: '',
};

interface IProps extends IHooksProps {
  onSave: (value: any, action: 'create' | 'update') => void;
  constraint: any;
}

export const useAddConstraint = ({ onAlert, onSave, constraint }: IProps) => {
  const [edit, setEdit] = useState(false);
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (payload: IValues) => {
      try {
        if (edit) {
          onSave(payload, 'update');
        } else {
          onSave(payload, 'create');
        }
        formik.handleReset('');
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  useEffect(() => {
    if (constraint) {
      const newValues = { ...defaultValues };
      Object.keys(defaultValues)?.forEach((key) => {
        if (constraint[key] !== undefined) {
          newValues[key] = constraint[key];
        }
      });
      formik.setValues(newValues);
      setEdit(true);
    }
  }, []);

  return { formik };
};
