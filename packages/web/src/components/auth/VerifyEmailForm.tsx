import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useVerifyEmail } from '@frontend/shared/hooks/auth/verifyEmail';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';

interface IProps {
  onSuccess?: () => void;
  email: string;
  label?: string;
  onCancel: () => void;
  disabled?: boolean;
  user: any;
}

export default function VerifyEmailForm({
  onSuccess,
  email,
  label = 'Verification Code',
  onCancel,
  disabled = false,
  user,
}: IProps) {
  const { formik, sendVerificationCode, isEmailSent } = useVerifyEmail({
    onAlert,
    email,
    onSuccess,
    user,
  });

  // useEffect(() => {
  //   sendVerificationCode();
  // }, []);

  return (
    <form onSubmit={formik.handleSubmit} data-testid="verify-email-form">
      <InputGroup>
        <Typography>Verify your email!</Typography>
        {!isEmailSent && <Typography variant="caption">Sending Verification code</Typography>}
        {isEmailSent && (
          <Typography variant="caption">Verification code has been sent to {email}</Typography>
        )}
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          type="text"
          name="code"
          size="small"
          disabled={disabled || formik.isSubmitting}
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
      </InputGroup>
      <InputGroup>
        <LoadingButton
          fullWidth
          data-testid="verify-button"
          type="submit"
          loading={disabled || formik.isSubmitting}
        >
          Verify
        </LoadingButton>
      </InputGroup>
      <InputGroup>
        <LoadingButton
          onClick={() => sendVerificationCode()}
          fullWidth
          loading={disabled || formik.isSubmitting}
        >
          Resend
        </LoadingButton>
      </InputGroup>
      <InputGroup>
        <LoadingButton
          fullWidth
          data-testid="cancel-button"
          variant="outlined"
          type="button"
          disabled={disabled || formik.isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </LoadingButton>
      </InputGroup>
    </form>
  );
}
