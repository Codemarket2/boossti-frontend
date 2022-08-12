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
  onSuccess: () => void;
}

export function useVerifyEmail({
  onAlert = () => null,
  email,
  onSuccess = () => null,
}: IVerifyEmailArgs) {
  const dispatch = useDispatch();

  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    sendVerificationCode();
    setIsEmailSent((_) => true);
  }, []);

  /** Sends a verification code to the email */
  const sendVerificationCode = async () => {
    const res = await Auth.resendSignUp(email);

    console.log(res);
  };

  const formik = useFormik({
    initialValues: verifyEmailFormValues,
    validationSchema: verifyEmailValidationSchema,
    onSubmit: async (values: IVerifyEmailFormValues) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (payload: IVerifyEmailFormValues) => {
    try {
      dispatch(showLoading());
      const { code } = payload;
      await Auth.confirmSignUp(email, code);
      dispatch(hideLoading());
      // formik.handleReset('');
      await onSuccess();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { formik, sendVerificationCode, isEmailSent } as const;
}
