import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { useForgetPassword } from '@frontend/shared/hooks/auth';
import PasswordInput from '../common/PasswordInput';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';

interface IProps {
  handleShowSignInForm: () => void;
}

export default function ForgetPasswordForm({ handleShowSignInForm }: IProps) {
  const { state, formik1, formik2 } = useForgetPassword({
    onAlert,
    handleShowSignInForm,
  });

  const showSignInForm = () => {
    formik1.handleReset('');
    formik2.handleReset('');
    handleShowSignInForm();
  };

  if (state.verify) {
    return (
      <form onSubmit={formik2.handleSubmit}>
        <TextField
          fullWidth
          label="Password Reset Code*"
          variant="outlined"
          className="my-3"
          type="text"
          name="code"
          size="small"
          disabled={formik2.isSubmitting}
          value={formik2.values.code}
          onChange={formik2.handleChange}
          error={formik2.touched.code && Boolean(formik2.errors.code)}
          helperText={formik2.touched.code && formik2.errors.code}
        />
        <PasswordInput
          fullWidth
          label="Password*"
          variant="outlined"
          className="my-3"
          name="password"
          size="small"
          labelWidth={80}
          disabled={formik2.isSubmitting}
          value={formik2.values.password}
          onChange={formik2.handleChange}
          error={formik2.touched.password && Boolean(formik2.errors.password)}
          helperText={formik2.touched.password && formik2.errors.password}
        />
        <PasswordInput
          fullWidth
          label="Confirm Password*"
          variant="outlined"
          className="my-3"
          name="confirmPassword"
          size="small"
          labelWidth={140}
          disabled={formik2.isSubmitting}
          value={formik2.values.confirmPassword}
          onChange={formik2.handleChange}
          error={formik2.touched.confirmPassword && Boolean(formik2.errors.confirmPassword)}
          helperText={formik2.touched.confirmPassword && formik2.errors.confirmPassword}
        />
        <FormHelperText
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={showSignInForm}>
          Already have account Sign In?
        </FormHelperText>
        <br />
        <LoadingButton type="submit" loading={formik2.isSubmitting} className="mt-2">
          Change Password
        </LoadingButton>
        <LoadingButton
          type="button"
          onClick={showSignInForm}
          loading={formik1.isSubmitting}
          className="mt-2 ml-2">
          Cancel
        </LoadingButton>
      </form>
    );
  } else {
    return (
      <form onSubmit={formik1.handleSubmit}>
        <p className="mb-0">Forget Password</p>
        <TextField
          fullWidth
          label="Email*"
          variant="outlined"
          className="my-3"
          name="email"
          size="small"
          disabled={formik1.isSubmitting}
          value={formik1.values.email}
          onChange={formik1.handleChange}
          error={formik1.touched.email && Boolean(formik1.errors.email)}
          helperText={formik1.touched.email && formik1.errors.email}
        />
        <FormHelperText
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={showSignInForm}>
          Already have account Sign in?
        </FormHelperText>
        <br />
        <LoadingButton type="submit" loading={formik1.isSubmitting} className="mt-2">
          Get Password Reset Code
        </LoadingButton>
        <LoadingButton
          type="button"
          onClick={showSignInForm}
          disabled={formik1.isSubmitting}
          className="mt-2 ml-2">
          Cancel
        </LoadingButton>
      </form>
    );
  }
}
