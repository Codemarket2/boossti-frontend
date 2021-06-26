import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { showLoading, hideLoading } from '../../redux/actions/loading';
export { useSignIn } from './signIn';

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
    onSubmit: async (values: ISignUpFormValues) => {
      await onSubmit(values);
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
      // formik.handleReset('');
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
