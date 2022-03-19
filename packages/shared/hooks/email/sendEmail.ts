import * as yup from 'yup';
import { useFormik } from 'formik';
import { CREATE_SEND_EMAIL } from '../../graphql/mutation/email';
import { useMutation } from '@apollo/client';

const validationSchema = yup.object({
  sendEmailLabel: yup.string().required('Label for send email is required'),
  senderEmail: yup.string().email('Invalid email').required('Email is required'),
  receiverEmail: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.split(/[\s,]+/) : [];
    })
    .of(yup.string().email(({ value }) => `${value} is not a valid email`))
    .required('Email is required'),
  subject: yup.string().required('Subject is required'),
  body: yup.string().required('Body cannot be empty'),
});

interface IFormValues {
  receiverEmail: any;
  sendEmailLabel: string;
  senderEmail: string;
  mailingList: string;
  subject: string;
  body: string;
  sendIndividual: boolean;
}

const defaultFormValues = {
  receiverEmail: [],
  mailingList: '',
  sendEmailLabel: '',
  senderEmail: '',
  subject: '',
  body: '',
  sendIndividual: false,
};

export function useSendEmail(): any {
  const [createSendEmail, { loading, data, error }] = useMutation(CREATE_SEND_EMAIL);
  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        const newPayload = {
          receiverEmail: payload.receiverEmail,
          mailingList: payload.mailingList,
          senderEmail: `${payload.sendEmailLabel} <${payload.senderEmail}>`,
          subject: payload.subject,
          body: payload.body,
          sendIndividual: payload.sendIndividual,
        };
        await createSendEmail({ variables: newPayload });
        console.log(payload);
        // await onSend(newPayload);
        formik.handleReset('');
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const onSend = async (payload) => {
    console.log('payload', payload);
    // const res = await createSendEmail({
    //   variables: payload,
    // });
  };

  const setFormValues = (form) => {
    formik.setFieldValue('subject', form.subject, false);
    formik.setFieldValue('body', form.body, false);
    formik.setFieldValue('receiverEmail', form.receiverEmail, false);
    formik.setFieldValue('senderEmail', form.senderEmail, false);
    formik.setFieldValue('sendIndividual', form.sendIndividual, false);
  };
  const formLoading = loading || formik.isSubmitting;
  return { formik, formLoading, setFormValues };
}
