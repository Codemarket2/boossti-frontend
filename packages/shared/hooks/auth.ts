import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { setAuthUser, initialAuthUser } from '../redux/actions/auth';
import { showLoading, hideLoading } from '../redux/actions/loading';
import { useInitialUser } from './users';

export function useCurrentAuthenticatedUser(): null {
  const dispatch = useDispatch();
  useInitialUser();
  const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false,
        };
        dispatch(setAuthUser(data));
      }
    } catch (error) {
      dispatch(initialAuthUser());
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return null;
}

interface IForgetPasswordState {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  verify: boolean;
  disabled: boolean;
}

interface IForgetPasswordArgs {
  onAlert: (a: string, b: string) => void;
  handleShowSignInForm: () => void;
}

// const forgetPasswordValidationSchema = yup.object({
//   email: yup.string().email('Enter a valid email').required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password should be of minimum 6 characters length')
//     .required('Password is required'),
// });

// interface IForgetPasswordFormValues {
//   email: string;
//   password: string;
// }

export function useForgetPassword({
  onAlert = () => {},
  handleShowSignInForm = () => {},
}: IForgetPasswordArgs) {
  const dispatch = useDispatch();
  const [state, setState] = useState<IForgetPasswordState>({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    verify: false,
    disabled: false,
  });

  const forgetPassword = async () => {
    setState({ ...state, disabled: true });
    await Auth.forgotPassword(state.email);
    setState({
      ...state,
      disabled: false,
      verify: true,
    });
  };

  const resetPassword = async () => {
    const { email, code, password, confirmPassword } = state;
    if (password === confirmPassword) {
      await Auth.forgotPasswordSubmit(email, code, password);
      setState({
        ...state,
        code: '',
        email: '',
        password: '',
        confirmPassword: '',
        disabled: false,
      });
      handleShowSignInForm();
    } else {
      throw new Error("Password and Confirm Password doesn't Match!");
    }
  };

  const onSubmit = async () => {
    try {
      dispatch(showLoading());
      setState({ ...state, disabled: true });
      if (state.verify) {
        await resetPassword();
      } else {
        await forgetPassword();
      }
      dispatch(hideLoading());
    } catch (error) {
      setState({ ...state, disabled: false });
      dispatch(hideLoading());
      onAlert('Error', error.message);
    }
  };

  return { state, setState, onSubmit };
}

interface ISignUpState {
  email: string;
  verify: boolean;
}

interface ISignUpArgs {
  onAlert: (a: string, b: string) => void;
}

const signUpValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

interface ISignUpFormValues {
  name: string;
  email: string;
  password: string;
}

const signUpValues: ISignUpFormValues = {
  name: '',
  email: '',
  password: '',
};

export function useSignUp({ onAlert = () => {} }: ISignUpArgs) {
  const dispatch = useDispatch();
  const [state, setState] = useState<ISignUpState>({
    email: '',
    verify: false,
  });

  const formik = useFormik({
    initialValues: signUpValues,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values: ISignUpFormValues, { handleReset }: any) => {
      await onSubmit(values);
      handleReset();
    },
  });

  const onSubmit = async (payload: ISignUpFormValues) => {
    try {
      dispatch(showLoading());
      const { password, email, name } = payload;
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
          picture: 'https://codemarket-common-storage.s3.amazonaws.com/public/default/profile.jpeg',
        },
      });
      setState({
        ...state,
        email,
        verify: true,
      });
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      onAlert('Error', error.message);
    }
  };

  return { state, setState, onSubmit, formik };
}

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
      // formik.handleReset();
      dispatch(setAuthUser(data));
      dispatch(hideLoading());
    } catch (error) {
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
  onAlert = () => {},
  email,
  onSuccess = () => {},
}: IVerifyEmailArgs) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: verifyEmailFormValues,
    validationSchema: verifyEmailValidationSchema,
    onSubmit: async (values: IVerifyEmailFormValues, { handleReset }: any) => {
      await onSubmit(values);
      handleReset();
    },
  });

  const onSubmit = async (payload: IVerifyEmailFormValues) => {
    try {
      dispatch(showLoading());
      const { code } = payload;
      await Auth.confirmSignUp(email, code);
      dispatch(hideLoading());
      onSuccess();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { formik };
}
