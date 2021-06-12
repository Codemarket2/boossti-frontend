import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { useForgetPassword } from '@frontend/shared/hooks/auth';
import LoadingButton from '../common/LoadingButton';

const onAlert = (title: string, message: string): void => {
  alert(`${title}, ${message}`);
};

interface IProps {
  changeLogin: (a: boolean) => void;
}

export default function ForgetPasswordForm({ changeLogin }: IProps) {
  const { state, setState, onSubmit } = useForgetPassword({
    onAlert,
    changeLogin,
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  if (state.verify) {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Verification Code"
          variant="outlined"
          className="w-100 my-3"
          onChange={handleChange}
          value={state.code}
          type="text"
          name="code"
          size="small"
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          className="w-100 my-3"
          onChange={handleChange}
          value={state.password}
          type="password"
          name="password"
          size="small"
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          className="w-100 my-3"
          onChange={handleChange}
          value={state.confirmPassword}
          type="password"
          name="confirmPassword"
          size="small"
          required
        />
        <FormHelperText
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={() => changeLogin(true)}>
          Already have account Sign In?
        </FormHelperText>
        <br />
        <LoadingButton type="submit" loading={state.disabled} className="mt-2">
          Change Password
        </LoadingButton>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <p className="mb-0">Forget Password</p>
        <TextField
          label="Email"
          variant="outlined"
          className="w-100 my-3"
          onChange={handleChange}
          value={state.email}
          type="email"
          name="email"
          size="small"
          required
        />
        <FormHelperText
          role="button"
          className="cursor-pointer d-inline-block"
          onClick={() => changeLogin(true)}>
          Already have account Sign in?
        </FormHelperText>
        <br />
        <LoadingButton type="submit" loading={state.disabled} className="mt-2">
          Reset Password
        </LoadingButton>
      </form>
    );
  }
}
