import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux';
import { hideLoading, showLoading } from '../../redux/actions/loading';

export interface IuseForcePwdResetHookArgs {
  username: string;
  oldPassword: string;
  onAlert: (...args) => void;

  /** if specified then this callback is fired after successfully changing the password */
  onSuccess?: (newPassword: string) => void;
}

// interface IhookState {

// }

interface IForcePwdResetFormValues {
  newPassword: string;
  confirmNewPassword: string;
}

const MIN_PWD_LENGTH = 8;

/** Validation Schema for formik */
const formValidationSchema = yup.object({
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

export function useForcePasswordReset({
  oldPassword,
  username,
  onAlert,
  onSuccess,
}: IuseForcePwdResetHookArgs) {
  // const [hookState, setHookState] = useState<IhookState>();

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (
    values: IForcePwdResetFormValues,
    formikHelpers: FormikHelpers<IForcePwdResetFormValues>,
  ) => {
    try {
      const user = await Auth.signIn(username, oldPassword);

      if (user.challengeName !== 'NEW_PASSWORD_REQUIRED') {
        throw new Error('User cannot force reset password in current state');
      }

      const updatedUser = await Auth.completeNewPassword(user, values.newPassword);

      onAlert('SUCCESS', 'Password has been resetted successfully!');

      if (onSuccess) onSuccess(values.newPassword);
    } catch (error) {
      onAlert('Error :', error.message);
    }
  };

  const formik = useFormik<IForcePwdResetFormValues>({
    initialValues: {
      confirmNewPassword: '',
      newPassword: '',
    },
    validationSchema: formValidationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (formik.isSubmitting) dispatch(showLoading());
    else dispatch(hideLoading());
    return () => {
      dispatch(hideLoading());
    };
  }, [formik.isSubmitting]);

  return [formik] as const;
}
