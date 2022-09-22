import { Reducer, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { FormikConfig, FormikHelpers, useFormik } from 'formik';
import { setAuthUser } from '../../redux/actions/auth';
import { showLoading, hideLoading } from '../../redux/actions/loading';
import { client } from '../../graphql';

interface ISignInArgs {
  onAlert: (a: string, b: string) => void;
  successCallback?: () => void;
  onError?: (err: { message: string }) => void;
}

interface ISignInState {
  email: string;
  /** required for verification prop */
  user: any;
  auth: boolean;
  showVerifyEmailForm: boolean;
  showForgetPasswordForm: {
    enabled: boolean;
    label?: string;
  };
  showForcePasswordResetForm: {
    enabled: boolean;
    username: string;
    oldPassword: string;
  };
}

const signInValidationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

interface ISignInFormValues {
  email: string;
  password: string;
}

export function useSignIn({ onAlert = () => null, successCallback }: ISignInArgs) {
  const [hookState, setHookState] = useState<ISignInState>({
    email: '',
    showVerifyEmailForm: false,
    auth: false,
    showForgetPasswordForm: {
      enabled: false,
    },
    showForcePasswordResetForm: {
      enabled: false,
      username: '',
      oldPassword: '',
    },
    user: null,
  });

  const dispatch = useDispatch();

  /** shows the verification component for email verification */
  const showVerificationComponent = async (userEmail, user = null) => {
    setHookState((prev) => ({
      ...prev,
      email: userEmail,
      user,
      showVerifyEmailForm: true,
    }));
  };

  const onSubmit: FormikConfig<ISignInFormValues>['onSubmit'] = async (oldPayload, _) => {
    const { password, email } = oldPayload;

    try {
      // if user credentials are correct then the user gets stored in the cache
      let user = await Auth.signIn(email, password);

      // make the user force reset the password
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setHookState((prev) => ({
          ...prev,
          showForcePasswordResetForm: {
            enabled: true,
            username: email,
            oldPassword: password,
          },
        }));

        return;
      }

      try {
        // Auth.signIn() can sometimes give cached user
        // flushes the cached user & refetches the user from aws server
        user = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
      } catch (err) {
        // if any challenge is occured then currentAuthenticatedUser() will throw error
        // just ignore the error
      }

      if (
        !user?.attributes?.email_verified ||
        user?.challengeParam?.userAttributes?.email_verified === 'False'
      ) {
        await showVerificationComponent(email, user);
        return;
      }

      const payload = {
        attributes: user.attributes,
        admin: user.signInUserSession.accessToken.payload['cognito:groups']
          ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') > -1
          : false,
      };

      client.resetStore();

      dispatch(setAuthUser(payload));
      if (successCallback) {
        successCallback();
      }
      return 'true';
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        await showVerificationComponent(email);
      } else {
        onAlert('Error', error.message);
      }

      return 'false';
    }
  };

  const formik = useFormik<ISignInFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (formik.isSubmitting) dispatch(showLoading());
    else dispatch(hideLoading());

    return () => {
      dispatch(hideLoading());
    };
  }, [formik.isSubmitting]);

  const forgetPwdForm = {
    hide: () =>
      setHookState((prev) => ({
        ...prev,
        showForgetPasswordForm: {
          ...prev.showForgetPasswordForm,
          enabled: false,
        },
      })),
    show: (label = '') =>
      setHookState((prev) => ({
        ...prev,
        showForgetPasswordForm: {
          ...prev.showForgetPasswordForm,
          enabled: true,
          label,
        },
      })),
  };

  const verifyEmailForm = {
    hide: () =>
      setHookState((prev) => ({
        ...prev,
        showVerifyEmailForm: false,
      })),

    show: () =>
      setHookState((prev) => ({
        ...prev,
        showVerifyEmailForm: true,
      })),
  };

  const forcePwdResetForm = {
    hide: () => {
      setHookState((prev) => ({
        ...prev,
        showForcePasswordResetForm: {
          ...prev.showForcePasswordResetForm,
          enabled: false,
        },
      }));
    },
  };

  return {
    state: hookState,
    setState: setHookState,
    formik,
    onSubmit,
    verifyEmailForm,
    forgetPwdForm,
    forcePwdResetForm,
  } as const;
}
