import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { showLoading, hideLoading } from '../../redux/actions/loading';
import { AppDispatch } from '../../redux';

export { useSignIn } from './signIn';
export { useSignUp } from './signUp';

export interface IuseForgotPwdHoodArgs {
  onAlert: (a: string, b: string) => void;

  /** if specified this callback is fired after successfully changing the password */
  onSuccess?: (newPassword: string) => void;

  email?: string;
}

interface IuseForgetPwdHookState {
  email: string;
  isOTPSent: boolean;
}

/** Validation Schema for formik */
const emailValidationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

interface IEmailFormValues {
  /** `required` for sending OTP to the email */
  email: string;
}

const MIN_PWD_LENGTH = 8;
const MIN_CODE_LENGTH = 6;

/** Validation Schema for formik */
const setNewPwdSchema = yup.object({
  code: yup
    .string()
    .length(
      MIN_CODE_LENGTH,
      `Password reset code should be of ${MIN_CODE_LENGTH} characters length`,
    )
    .required('Password reset code is required'),
  newPassword: yup
    .string()
    .min(MIN_PWD_LENGTH, `Password should be of minimum ${MIN_PWD_LENGTH} characters length`)
    .required('Password is required'),
  confirmNewPassword: yup
    .string()
    .min(MIN_PWD_LENGTH, `Password should be of minimum ${MIN_PWD_LENGTH} characters length`)
    .required('Password is required')
    .test('passwords-match', 'Passwords must match', function matchPwd(value) {
      return this.parent.newPassword === value;
    }),
});

interface ISetNewPwdFormValues {
  /** `required` for verifying the password reset OTP */
  code: string;
  /** `required` new password of the user */
  newPassword: string;
  /** `required` for making sure user doesn't mess up entering his new password */
  confirmNewPassword: string;
}

export function useForgetPassword({
  onAlert = () => null,
  onSuccess,
  email = '',
}: IuseForgotPwdHoodArgs) {
  const dispatch: AppDispatch = useDispatch();

  const [hookState, setHookState] = useState<IuseForgetPwdHookState>({
    email,
    isOTPSent: false,
  });

  /** used for sending password reset OTP to email */
  const otpFormik = useFormik<IEmailFormValues>({
    initialValues: {
      email,
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values, actions) => {
      await forgetPassword(values, actions);
    },
  });

  /** used for entering the new password */
  const setNewPwdFormik = useFormik<ISetNewPwdFormValues>({
    initialValues: {
      code: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: setNewPwdSchema,
    onSubmit: async (values, actions) => {
      await forgotPasswordSubmit(values, actions);
    },
  });

  useEffect(() => {
    if (otpFormik.isSubmitting || setNewPwdFormik.isSubmitting) dispatch(showLoading());
    else dispatch(hideLoading());
    return () => {
      dispatch(hideLoading());
    };
  }, [otpFormik.isSubmitting, setNewPwdFormik.isSubmitting]);

  const forgetPassword = async (
    payload: IEmailFormValues,
    actions: FormikHelpers<IEmailFormValues>,
  ) => {
    try {
      const { email: uEmail } = payload;
      const res = await Auth.forgotPassword(uEmail);

      setHookState((prev) => ({
        ...prev,
        email: uEmail,
        isOTPSent: true,
      }));
    } catch (error) {
      if (error?.code === 'NotAuthorizedException') {
        // When user's account status is FORCE_PASSWORD_CHANGE, just try to signin once as workarounds are already added
        onAlert('Error', `${error.message}, Please Try to Signin`);
      } else {
        onAlert('Error', error.message);
      }
    }
  };

  const forgotPasswordSubmit = async (
    payload: ISetNewPwdFormValues,
    actions: FormikHelpers<ISetNewPwdFormValues>,
  ) => {
    try {
      const { code, newPassword } = payload;

      const res = await Auth.forgotPasswordSubmit(hookState.email, code, newPassword);
      if (onSuccess) onSuccess(newPassword);
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { state: hookState, otpFormik, setNewPwdFormik };
}
