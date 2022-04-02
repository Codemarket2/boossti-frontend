import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { showLoading, hideLoading } from '../../redux/actions/loading';

export { useSignIn } from './signIn';
export { useSignUp } from './signUp';

interface IForgetPasswordState {
  email: string;
  verify: boolean;
}

interface IForgetPasswordArgs {
  onAlert: (a: string, b: string) => void;
  handleShowSignInForm: () => void;
}

const forgetPassword1ValidationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

interface IForgetPassword1FormValues {
  email: string;
}

const forgetPassword1Value: IForgetPassword1FormValues = {
  email: '',
};

const forgetPassword2ValidationSchema = yup.object({
  code: yup
    .string()
    .length(6, 'Password reset code should be of 6 characters length')
    .required('Password reset code is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

interface IForgetPassword2FormValues {
  code: string;
  password: string;
  confirmPassword: string;
}

const forgetPassword2Value: IForgetPassword2FormValues = {
  code: '',
  password: '',
  confirmPassword: '',
};

export function useForgetPassword({
  onAlert = () => null,
  handleShowSignInForm = () => null,
}: IForgetPasswordArgs) {
  const dispatch = useDispatch();
  const [state, setState] = useState<IForgetPasswordState>({
    email: '',
    verify: false,
  });

  const formik1 = useFormik({
    initialValues: forgetPassword1Value,
    validationSchema: forgetPassword1ValidationSchema,
    onSubmit: async (values: IForgetPassword1FormValues) => {
      await onSubmit(values);
    },
  });

  const formik2 = useFormik({
    initialValues: forgetPassword2Value,
    validationSchema: forgetPassword2ValidationSchema,
    onSubmit: async (values: IForgetPassword2FormValues) => {
      await onSubmit(values);
    },
  });

  const forgetPassword = async (payload: any) => {
    const { email } = payload;
    await Auth.forgotPassword(email);
    setState({
      ...state,
      email,
      verify: true,
    });
    formik1.handleReset('');
  };

  const resetPassword = async (payload: any) => {
    const { email } = state;
    const { code, password, confirmPassword } = payload;
    if (password === confirmPassword) {
      await Auth.forgotPasswordSubmit(email, code, password);
      setState({
        ...state,
        email: '',
      });
      formik2.handleReset('');
      handleShowSignInForm();
    } else {
      throw new Error("Password and Confirm Password doesn't Match!");
    }
  };

  const onSubmit = async (payload: IForgetPassword1FormValues | IForgetPassword2FormValues) => {
    try {
      dispatch(showLoading());
      if (state.verify) {
        await resetPassword(payload);
      } else {
        await forgetPassword(payload);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      onAlert('Error', error.message);
    }
  };

  return { state, formik1, formik2 };
}
