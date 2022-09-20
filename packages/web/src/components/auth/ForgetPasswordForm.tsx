import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  useForgetPassword,
  IuseForgotPwdHoodArgs,
} from '@frontend/shared/hooks/auth/forgetPassword';
import PasswordInput from '../common/PasswordInput';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';

interface IProps {
  onSuccess?: IuseForgotPwdHoodArgs['onSuccess'];

  /**
   * this callback is fired if user want's to cancel the Forget Password operation
   * if not specified then `cancel button` get's hidden
   * */
  onCancel?: () => void;

  email?: string;
  label?: string;
}
/** This form can be used for forgetting & resetting the user's password */
export default function ForgetPasswordForm({
  onSuccess,
  email = '',
  label = '',
  onCancel,
}: IProps) {
  const { state, otpFormik, setNewPwdFormik } = useForgetPassword({
    onAlert,
    onSuccess,
    email,
  });

  useEffect(() => {
    if (email) {
      otpFormik.setFieldValue('email', email);
    }
  }, []);

  if (state.isOTPSent) {
    return (
      <form onSubmit={setNewPwdFormik.handleSubmit} data-testid="forget-password-form">
        <InputGroup>
          <Typography>{label || 'Forget Password'}</Typography>
        </InputGroup>
        <InputGroup>
          <TextField
            autoComplete="off"
            fullWidth
            label="Password Reset Code*"
            variant="outlined"
            type="text"
            name="code"
            size="small"
            disabled={setNewPwdFormik.isSubmitting}
            value={setNewPwdFormik.values.code}
            onChange={setNewPwdFormik.handleChange}
            error={setNewPwdFormik.touched.code && Boolean(setNewPwdFormik.errors.code)}
            helperText={setNewPwdFormik.touched.code && setNewPwdFormik.errors.code}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            fullWidth
            label="Password*"
            variant="outlined"
            name="newPassword"
            size="small"
            labelWidth={80}
            disabled={setNewPwdFormik.isSubmitting}
            value={setNewPwdFormik.values.newPassword}
            onChange={setNewPwdFormik.handleChange}
            error={
              setNewPwdFormik.touched.newPassword && Boolean(setNewPwdFormik.errors.newPassword)
            }
            helperText={setNewPwdFormik.touched.newPassword && setNewPwdFormik.errors.newPassword}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            fullWidth
            label="Confirm Password*"
            variant="outlined"
            name="confirmNewPassword"
            size="small"
            labelWidth={140}
            disabled={setNewPwdFormik.isSubmitting}
            value={setNewPwdFormik.values.confirmNewPassword}
            onChange={setNewPwdFormik.handleChange}
            error={
              setNewPwdFormik.touched.confirmNewPassword &&
              Boolean(setNewPwdFormik.errors.confirmNewPassword)
            }
            helperText={
              setNewPwdFormik.touched.confirmNewPassword &&
              setNewPwdFormik.errors.confirmNewPassword
            }
          />
        </InputGroup>
        <InputGroup>
          <LoadingButton
            fullWidth
            type="submit"
            loading={setNewPwdFormik.isSubmitting}
            className="mt-2"
          >
            Change Password
          </LoadingButton>
        </InputGroup>
        {onCancel && (
          <InputGroup>
            <LoadingButton
              fullWidth
              type="button"
              variant="outlined"
              onClick={() => onCancel()}
              loading={setNewPwdFormik.isSubmitting}
            >
              Cancel
            </LoadingButton>
          </InputGroup>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={otpFormik.handleSubmit} data-testid="forget-password-form">
      <InputGroup>
        <Typography>{label || 'Forget Password'}</Typography>
      </InputGroup>
      <InputGroup>
        <TextField
          fullWidth
          label="Email*"
          variant="outlined"
          name="email"
          size="small"
          disabled={otpFormik.isSubmitting}
          value={otpFormik.values.email}
          onChange={otpFormik.handleChange}
          error={otpFormik.touched.email && Boolean(otpFormik.errors.email)}
          helperText={otpFormik.touched.email && otpFormik.errors.email}
        />
      </InputGroup>
      <InputGroup>
        <LoadingButton
          fullWidth
          data-testid="reset-code-button"
          type="submit"
          loading={otpFormik.isSubmitting}
        >
          Get Password Reset Code
        </LoadingButton>
      </InputGroup>

      {onCancel && (
        <InputGroup>
          <LoadingButton
            fullWidth
            data-testid="cancel-button"
            type="button"
            variant="outlined"
            onClick={() => onCancel()}
            disabled={otpFormik.isSubmitting}
          >
            Cancel
          </LoadingButton>
        </InputGroup>
      )}
    </form>
  );
}
