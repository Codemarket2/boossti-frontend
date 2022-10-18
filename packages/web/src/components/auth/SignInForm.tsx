import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSignIn } from '@frontend/shared/hooks/auth/signIn';
import VerifyEmailForm from './VerifyEmailForm';
import LoadingButton from '../common/LoadingButton';
import PasswordInput from '../common/PasswordInput';
import ForgetPasswordForm from './ForgetPasswordForm';
import { onAlert } from '../../utils/alert';
import SocialSignIn from './SocialSignIn';
import InputGroup from '../common/InputGroup';
import ForcePasswordResetForm from './ForcePasswordResetForm';

interface IProps {
  successCallback?: () => void;
}

export default function SignInForm({ successCallback }: IProps) {
  const { state, formik, verifyEmailForm, forgetPwdForm, forcePwdResetForm } = useSignIn({
    onAlert,
    successCallback,
  });

  if (state.showForcePasswordResetForm.enabled) {
    const { oldPassword, username } = state.showForcePasswordResetForm;

    const onSuccess = (newPassword: string) => {
      forcePwdResetForm.hide();
      // uncomment for auto signin after resetting the password
      formik.setFieldValue('password', newPassword).then(() => {
        // adding delay intentionally, as it takes a few seconds to update the password in the AWS Cognito
        setTimeout(formik.submitForm, 500);
      });
    };

    return (
      <ForcePasswordResetForm
        onSuccess={onSuccess}
        onCancel={forcePwdResetForm.hide}
        username={username}
        oldPassword={oldPassword}
      />
    );
  }

  if (state.showForgetPasswordForm.enabled) {
    const onSuccess = (newPassword: string) => {
      forgetPwdForm.hide();

      // uncomment for auto signin after resetting the password
      formik.setFieldValue('password', newPassword).then(() => {
        // adding delay intentionally, as it takes a few seconds to update the password in the AWS Cognito
        setTimeout(formik.submitForm, 500);
      });
    };

    return (
      <ForgetPasswordForm email={state.email} onSuccess={onSuccess} onCancel={forgetPwdForm.hide} />
    );
  }

  if (state.showVerifyEmailForm) {
    return (
      <VerifyEmailForm
        onSuccess={() => {
          formik.submitForm();
        }}
        email={state.email}
        user={state.user}
        onCancel={verifyEmailForm.hide}
      />
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} data-testid="signin-form">
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
          disabled={formik.isSubmitting}
          fullWidth
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
      </InputGroup>
      <InputGroup>
        <LoadingButton
          fullWidth
          data-testid="signin-button"
          type="submit"
          loading={formik.isSubmitting}
        >
          Sign In
        </LoadingButton>
      </InputGroup>
      <InputGroup>
        <Typography
          align="center"
          data-testid="forget-password-text"
          role="button"
          onClick={() => forgetPwdForm.show()}
        >
          Forgot Password?
        </Typography>
      </InputGroup>
      <SocialSignIn />
    </form>
  );
}
