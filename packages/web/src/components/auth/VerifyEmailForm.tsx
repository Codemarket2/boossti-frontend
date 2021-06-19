import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { useVerifyEmail } from '@frontend/shared/hooks/auth';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';

interface IProps {
  onSuccess: () => void;
  email: string;
  label: string;
  onLabelClick: () => void;
  disabled?: boolean;
}

export default function VerifyEmailForm({
  onSuccess,
  email,
  label,
  onLabelClick,
  disabled = false,
}: IProps) {
  const { formik } = useVerifyEmail({ onAlert, email, onSuccess });
  return (
    <form onSubmit={formik.handleSubmit} data-testid="verify-email-form">
      <p>Verify your email!</p>
      <small>Verification code has been sent to {email}</small>
      <TextField
        label="Verification Code"
        variant="outlined"
        className="w-100 my-2"
        type="text"
        name="code"
        size="small"
        disabled={disabled || formik.isSubmitting}
        value={formik.values.code}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      {label && (
        <FormHelperText
          data-testid="caption-text"
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={onLabelClick}>
          {label}
        </FormHelperText>
      )}
      <br />
      <LoadingButton
        data-testid="verify-button"
        type="submit"
        loading={disabled || formik.isSubmitting}>
        Verify
      </LoadingButton>
    </form>
  );
}
