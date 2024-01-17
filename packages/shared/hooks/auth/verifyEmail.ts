import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { showLoading, hideLoading } from '../../redux/actions/loading';

interface IVerifyEmailFormValues {
  code: string;
}

const verifyEmailFormValues: IVerifyEmailFormValues = {
  code: '',
};

const verifyEmailValidationSchema = yup.object({
  code: yup
    .string()
    .length(6, 'Code should be of 6 characters length')
    .required('Verification code is required'),
});

interface IVerifyEmailArgs {
  onAlert: (a: string, b: string) => void;
  email: string;
  onSuccess?: () => void;
  user: any;
}

export function useVerifyEmail({ onAlert = () => null, email, onSuccess, user }: IVerifyEmailArgs) {
  const dispatch = useDispatch();

  const [isEmailSent, setIsEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: verifyEmailFormValues,
    validationSchema: verifyEmailValidationSchema,
    onSubmit: async (values: IVerifyEmailFormValues) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    setIsEmailSent(false);
    sendVerificationCode()
      .then(() => setIsEmailSent((_) => true))
      .catch((err) => {
        onAlert('Error', err.message);
      });
  }, []);

  useEffect(() => {
    if (formik.isSubmitting) dispatch(showLoading());
    else dispatch(hideLoading());

    return () => {
      dispatch(hideLoading());
    };
  }, [formik.isSubmitting]);

  /** Sends a verification code to the email */
  const sendVerificationCode = async () => {
    if (user) await Auth.verifyCurrentUserAttribute('email');
    else await Auth.resendSignUp(email);
  };

  const onSubmit = async (payload: IVerifyEmailFormValues) => {
    try {
      const { code } = payload;

      if (user) {
        const res = await Auth.verifyCurrentUserAttributeSubmit('email', code);

        if (res === 'SUCCESS') {
          if (onSuccess) {
            onSuccess();
          }
        } else {
          // THROW SOME ERROR MESSAGE
        }
      } else {
        await Auth.confirmSignUp(email, code);
      }

      // formik.handleReset('');
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { formik, sendVerificationCode, isEmailSent } as const;
}
