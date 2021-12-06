import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';

const validationSchema = yup.object({
  active: yup.boolean(),
  actionType: yup.string().label('Action type').required(),
  name: yup.string().label('Action name').required(),
  senderEmail: yup.string().label('Sender email').email().required(),
  useEmailField: yup.boolean(),
  emailFieldId: yup.string().when('useEmailField', {
    is: (value) => value === true,
    then: yup.string().label('Email field').required(),
    otherwise: yup.string(),
  }),
  receiverEmail: yup.string().when('useEmailField', {
    is: (value) => value === true,
    then: yup.string(),
    otherwise: yup.string().label('Receiver email').email().required(),
  }),
  variables: yup.array(),
  subject: yup.string().required('Email subject is required'),
  body: yup.string().required('Email body is required'),
});

type TVariables = {
  name: string;
  field: string;
};

interface IFormValues {
  active: boolean;
  actionType: string;
  name: string;
  senderEmail: string;
  useEmailField: boolean;
  emailFieldId: string;
  receiverEmail: string;
  variables: [TVariables];
  subject: string;
  body: string;
}

const defaultFormValues = {
  active: true,
  actionType: 'sendEmail',
  name: '',
  senderEmail: '',
  useEmailField: false,
  emailFieldId: '',
  receiverEmail: '',
  variables: [{ name: '', field: '' }],
  subject: '',
  body: '',
};

interface IProps extends IHooksProps {
  onSave: any;
}

export function useFormActions({ onAlert, onSave }: IProps) {
  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
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

  const setFormValues = (payload) => {
    setEdit(true);
    formik.setFieldValue('active', payload.active, false);
    formik.setFieldValue('name', payload.name, false);
    formik.setFieldValue('senderEmail', payload.senderEmail, false);
    formik.setFieldValue('useEmailField', payload.useEmailField, false);
    formik.setFieldValue('emailFieldId', payload.emailFieldId, false);
    formik.setFieldValue('receiverEmail', payload.receiverEmail, false);
    formik.setFieldValue('variables', payload.variables, false);
    formik.setFieldValue('subject', payload.subject, false);
    formik.setFieldValue('body', payload.body, false);
  };

  return { formik, setFormValues };
}
