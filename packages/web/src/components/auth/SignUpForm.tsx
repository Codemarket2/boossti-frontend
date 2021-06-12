import React from 'react';
import {
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@material-ui/core';
import { useSignUp } from '@frontend/shared/hooks/auth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LoadingButton from '../common/LoadingButton';
import SendVerificationCodeForm from './SendVerificationCodeForm';

const onAlert = (title: string, message: string): void => {
  alert(`${title}, ${message}`);
};

export default function SignUpForm() {
  const { state, setState, onSubmit } = useSignUp({ onAlert });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = (): void => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent): void => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit();
  };

  if (state.verify) {
    return (
      <SendVerificationCodeForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        email={state.email}
        code={state.code}
        disabled={state.disabled}
        label="Sign Up Again?"
        onLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          className="w-100 my-3"
          onChange={handleChange}
          value={state.name}
          type="text"
          name="name"
          size="small"
          required
        />
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
        <FormControl className="my-3 w-100" variant="outlined" size="small" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={state.showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={state.password}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <LoadingButton type="submit" loading={state.disabled} className="mt-2">
          Sign Up
        </LoadingButton>
      </form>
    );
  }
}
