import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { setAuthUser } from '../../redux/actions/auth';
import { showLoading, hideLoading } from '../../redux/actions/loading';

interface ISignInArgs {
  onAlert: (a: string, b: string) => void;
}

interface ISignInState {
  email: string;
  verify: boolean;
  auth: boolean;
  showForgetPasswordForm: boolean;
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

const signInValues: ISignInFormValues = {
  email: '',
  password: '',
};

export function useSignIn({ onAlert = () => {} }: ISignInArgs) {
  const [state, setState] = useState<ISignInState>({
    email: '',
    verify: false,
    auth: false,
    showForgetPasswordForm: false,
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: signInValues,
    validationSchema: signInValidationSchema,
    onSubmit: async (values: ISignInFormValues) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (payload) => {
    const { password, email } = payload;
    try {
      dispatch(showLoading());
      const user = await Auth.signIn(email, password);
      const data = {
        attributes: user.attributes,
        signInUserSession: user.signInUserSession,
        admin: user.signInUserSession.accessToken.payload['cognito:groups']
          ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') > -1
          : false,
      };
      formik.handleReset('');
      dispatch(setAuthUser(data));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      if (error.code === 'UserNotConfirmedException') {
        await sendVerificationCode(email);
      } else {
        onAlert('Error', error.message);
      }
    }
  };

  const sendVerificationCode = async (email) => {
    await Auth.resendSignUp(email);
    setState({
      ...state,
      email,
      disabled: false,
      verify: true,
    });
  };

  return { state, setState, onSubmit, formik };
}
