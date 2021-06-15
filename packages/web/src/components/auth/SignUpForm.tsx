import React from 'react';
import { TextField } from '@material-ui/core';
import { useSignUp } from '@frontend/shared/hooks/auth';
import LoadingButton from '../common/LoadingButton';
import VerifyEmailForm from './VerifyEmailForm';
import { onAlert } from '../../utils/alert';
import SocialSignIn from './SocialSignIn';
import PasswordInput from '../common/PasswordInput';

export default function SignUpForm() {
  const { state, setState, formik } = useSignUp({ onAlert });

  if (state.verify) {
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
        label="Sign Up Again?"
        onLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  } else {
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Name*"
          variant="outlined"
          className="my-3"
          type="text"
          name="name"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          className="my-3"
          label="Email*"
          name="email"
          variant="outlined"
          type="text"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <PasswordInput
          fullWidth
          className="my-3"
          label="Password*"
          name="password"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          labelWidth={80}
        />
        <LoadingButton type="submit" loading={formik.isSubmitting} className="mt-2">
          Sign Up
        </LoadingButton>
        <SocialSignIn />
      </form>
    );
  }
}
