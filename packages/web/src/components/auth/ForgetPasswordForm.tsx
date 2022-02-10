import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useForgetPassword } from '@frontend/shared/hooks/auth';
import PasswordInput from '../common/PasswordInput';
import LoadingButton from '../common/LoadingButton';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';

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
      <form onSubmit={formik2.handleSubmit} data-testid="forget-password-form">
        <InputGroup>
          <Typography>Forgot Password</Typography>
        </InputGroup>
        <InputGroup>
          <TextField
            fullWidth
            label="Password Reset Code*"
            variant="outlined"
            type="text"
            name="code"
            size="small"
            disabled={formik2.isSubmitting}
            value={formik2.values.code}
            onChange={formik2.handleChange}
            error={formik2.touched.code && Boolean(formik2.errors.code)}
            helperText={formik2.touched.code && formik2.errors.code}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            fullWidth
            label="Password*"
            variant="outlined"
            name="password"
            size="small"
            labelWidth={80}
            disabled={formik2.isSubmitting}
            value={formik2.values.password}
            onChange={formik2.handleChange}
            error={formik2.touched.password && Boolean(formik2.errors.password)}
            helperText={formik2.touched.password && formik2.errors.password}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            fullWidth
            label="Confirm Password*"
            variant="outlined"
            name="confirmPassword"
            size="small"
            labelWidth={140}
            disabled={formik2.isSubmitting}
            value={formik2.values.confirmPassword}
            onChange={formik2.handleChange}
            error={formik2.touched.confirmPassword && Boolean(formik2.errors.confirmPassword)}
            helperText={formik2.touched.confirmPassword && formik2.errors.confirmPassword}
          />
        </InputGroup>
        <InputGroup>
          <LoadingButton fullWidth type="submit" loading={formik2.isSubmitting} className="mt-2">
            Change Password
          </LoadingButton>
        </InputGroup>
        <InputGroup>
          <LoadingButton
            fullWidth
            type="button"
            variant="outlined"
            onClick={showSignInForm}
            loading={formik1.isSubmitting}
          >
            Cancel
          </LoadingButton>
        </InputGroup>
      </form>
    );
  } else {
    return (
      <form onSubmit={formik1.handleSubmit} data-testid="forget-password-form">
        <InputGroup>
          <Typography>Forgot Password</Typography>
        </InputGroup>
        <InputGroup>
          <TextField
            fullWidth
            label="Email*"
            variant="outlined"
            name="email"
            size="small"
            disabled={formik1.isSubmitting}
            value={formik1.values.email}
            onChange={formik1.handleChange}
            error={formik1.touched.email && Boolean(formik1.errors.email)}
            helperText={formik1.touched.email && formik1.errors.email}
          />
        </InputGroup>
        <InputGroup>
          <LoadingButton
            fullWidth
            data-testid="reset-code-button"
            type="submit"
            loading={formik1.isSubmitting}
          >
            Get Password Reset Code
          </LoadingButton>
        </InputGroup>
        <InputGroup>
          <LoadingButton
            fullWidth
            data-testid="cancel-button"
            type="button"
            variant="outlined"
            onClick={showSignInForm}
            disabled={formik1.isSubmitting}
          >
            Cancel
          </LoadingButton>
        </InputGroup>
      </form>
    );
  }
}
