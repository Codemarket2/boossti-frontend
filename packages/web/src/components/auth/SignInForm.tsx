import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSignIn } from '@frontend/shared/hooks/auth';
import VerifyEmailForm from './VerifyEmailForm';
import LoadingButton from '../common/LoadingButton';
import PasswordInput from '../common/PasswordInput';
import ForgetPasswordForm from './ForgetPasswordForm';
import { onAlert } from '../../utils/alert';
import SocialSignIn from './SocialSignIn';
import InputGroup from '../common/InputGroup';

interface IProps {
  successCallback?: () => void;
}

export default function SignInForm({ successCallback }: IProps) {
  const { state, setState, formik } = useSignIn({ onAlert, successCallback });

  if (state.showForgetPasswordForm) {
    return (
      <ForgetPasswordForm
        handleShowSignInForm={() => setState({ ...state, showForgetPasswordForm: false })}
      />
    );
  } else if (state.verify) {
    return (
      <VerifyEmailForm
        onSuccess={formik.handleSubmit}
        email={state.email}
        label="Sign In Again?"
        onLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  } else {
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
            onClick={() => setState({ ...state, showForgetPasswordForm: true })}
          >
            Forgot Password?
          </Typography>
        </InputGroup>
        <SocialSignIn />
      </form>
    );
  }
}
