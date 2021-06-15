import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { useSignIn } from '@frontend/shared/hooks/auth';
import VerifyEmailForm from './VerifyEmailForm';
import LoadingButton from '../common/LoadingButton';
import PasswordInput from '../common/PasswordInput';
import ForgetPasswordForm from './ForgetPasswordForm';
import { onAlert } from '../../utils/alert';
import SocialSignIn from './SocialSignIn';

export default function SignInForm() {
  const { state, setState, formik } = useSignIn({ onAlert });

  if (state.showForgetPasswordForm) {
    return (
      <ForgetPasswordForm
        handleShowSignInForm={() => setState({ ...state, showForgetPasswordForm: false })}
      />
    );
  } else if (state.verify) {
    return (
      <VerifyEmailForm
        onSuccess={() => {
          setState({
            ...state,
            email: '',
            verify: false,
          });
          onAlert('Email Verified Successfully', 'Please Sign In now with your email and password');
        }}
        email={state.email}
        label="Sign In Again?"
        onLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  } else {
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          disabled={formik.isSubmitting}
          fullWidth
          className="my-3"
          label="Email*"
          name="email"
          variant="outlined"
          type="text"
          size="small"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <PasswordInput
          disabled={formik.isSubmitting}
          fullWidth
          className="my-3"
          label="Password*"
          name="password"
          variant="outlined"
          size="small"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          labelWidth={80}
        />
        <FormHelperText
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={() => setState({ ...state, showForgetPasswordForm: true })}>
          Lost your password?
        </FormHelperText>
        <br />
        <LoadingButton type="submit" loading={formik.isSubmitting} className="mt-2">
          Sign In
        </LoadingButton>
        <br />
        <SocialSignIn />
      </form>
    );
  }
}
