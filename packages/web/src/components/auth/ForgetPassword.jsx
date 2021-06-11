import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, FormHelperText } from '@material-ui/core';
import LoadingButton from '../common/LoadingButton';

export default function ForgetPassword(props) {
  const [state, setState] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    verify: false,
    disabled: false,
  });

  const forgetPassword = async () => {
    try {
      setState({ ...state, disabled: true });
      await Auth.forgotPassword(state.email);
      setState({
        ...state,
        disabled: false,
        verify: true,
      });
    } catch (error) {
      setState({ ...state, disabled: false });
    }
  };

  const resetPassword = async () => {
    const { email, code, password, confirmPassword } = state;

    if (password === confirmPassword) {
      try {
        await Auth.forgotPasswordSubmit(email, code, password);
        setState({
          ...state,
          code: '',
          email: '',
          password: '',
          confirmPassword: '',
          disabled: false,
        });
        props.changeLogin(true);
      } catch (error) {
        setState({ ...state, disabled: false });
        alert(err.message);
      }
    } else {
      alert("Password and Confirm Password doesn't Match!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { verify } = state;
    setState({ ...state, disabled: true });
    if (verify) {
      resetPassword();
    } else {
      forgetPassword();
    }
    e.target.reset();
  };

  const handleChange = (e) => {
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
          onClick={() => props.changeLogin(true)}>
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
          onClick={() => props.changeLogin(true)}>
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
