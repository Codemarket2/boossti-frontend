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
  onAlert = () => {},
  email,
  onSuccess = () => {},
}: IVerifyEmailArgs) {
  const dispatch = useDispatch();

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

  return { formik };
}
