import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';

const validationSchema = yup.object({
  active: yup.boolean(),
  actionType: yup.string().label('Action type').required(),
  name: yup.string().label('Action name').required(),
  senderEmail: yup.string().label('Sender email').email().required(),
  receiverType: yup.string().label('Receiver').required(),
  emailFieldId: yup.string().when('receiverType', {
    is: (value) => value === 'emailField',
    then: yup.string().label('Email field').required(),
    otherwise: yup.string(),
  }),
  receiverEmails: yup.array().when('receiverType', {
    is: (value) => value === 'customEmail',
    then: yup
      .array()
      .label('Receiver emails')
      .of(yup.string().label(' ').email().required())
      .min(1),
    otherwise: yup.array(),
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
  receiverType: string;
  emailFieldId: string;
  receiverEmails: string[];
  variables: [TVariables];
  subject: string;
  body: string;
}

const defaultFormValues = {
  active: true,
  actionType: 'sendEmail',
  name: '',
  senderEmail: '',
  receiverType: 'customEmail',
  emailFieldId: '',
  receiverEmails: [],
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
    formik.setFieldValue('receiverType', payload?.receiverType, false);
    formik.setFieldValue('emailFieldId', payload.emailFieldId, false);
    formik.setFieldValue('receiverEmails', payload?.receiverEmails, false);
    formik.setFieldValue('variables', payload.variables, false);
    formik.setFieldValue('subject', payload.subject, false);
    formik.setFieldValue('body', payload.body, false);
  };

  return { formik, setFormValues };
}
