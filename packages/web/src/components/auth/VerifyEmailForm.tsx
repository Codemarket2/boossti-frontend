import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useVerifyEmail } from '@frontend/shared/hooks/auth';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';

interface IProps {
  onSuccess: () => void;
  email: string;
  label?: string;
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
      <InputGroup>
        <Typography>Verify your email!</Typography>
        <Typography variant="caption">Verification code has been sent to {email}</Typography>
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label="Verification Code"
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
          fullWidth
          data-testid="cancel-button"
          variant="outlined"
          type="button"
          disabled={disabled || formik.isSubmitting}
          onClick={onLabelClick}
        >
          Cancel
        </LoadingButton>
      </InputGroup>
    </form>
  );
}
