import React from 'react';
import TextField from '@mui/material/TextField';
import { useSignUp, useSignIn } from '@frontend/shared/hooks/auth';
import LoadingButton from '../common/LoadingButton';
import VerifyEmailForm from './VerifyEmailForm';
import { onAlert } from '../../utils/alert';
import SocialSignIn from './SocialSignIn';
import PasswordInput from '../common/PasswordInput';
import InputGroup from '../common/InputGroup';

export default function SignUpForm() {
  const { state, setState, formik } = useSignUp({ onAlert });
  const { onSubmit } = useSignIn({ onAlert });

  if (state.verify) {
    return (
      <VerifyEmailForm
        onSuccess={async () => {
          try {
            await onSubmit({ email: formik.values.email, password: formik.values.password });
          } catch (error) {
            formik.handleReset('');
            setState({
              ...state,
              email: '',
              verify: false,
            });
            onAlert(
              'Email Verified Successfully',
              'Please Sign In now with your email and password',
            );
          }
        }}
        email={state.email}
        label="Sign Up Again?"
        onLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  }
  return (
    <form onSubmit={formik.handleSubmit} data-testid="signup-form">
      <InputGroup>
        <TextField
          fullWidth
          label="Name*"
          variant="outlined"
          type="text"
          name="name"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
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
      </InputGroup>
      <InputGroup>
        <PasswordInput
          fullWidth
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
      </InputGroup>
      <InputGroup>
        <LoadingButton
          fullWidth
          data-testid="signup-button"
          type="submit"
          loading={formik.isSubmitting}
        >
          Sign Up
        </LoadingButton>
      </InputGroup>
      <SocialSignIn signIn={false} />
    </form>
  );
}
