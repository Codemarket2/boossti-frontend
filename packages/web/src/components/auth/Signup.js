import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@material-ui/core';
import { showLoading, hideLoading } from 'react-redux-loading';
import { Auth } from 'aws-amplify';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LoadingButton from '../common/LoadingButton';
import SendVerificationCodeForm from './SendVerificationCodeForm';

export default function SignUp() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    disabled: false,
    code: '',
    verify: false,
    showPassword: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUp = async () => {
    try {
      const { password, email, name } = state;
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
          picture: 'https://codemarket-common-storage.s3.amazonaws.com/public/default/profile.jpeg',
        },
      });
      setState({
        ...state,
        password: '',
        name: '',
        verify: true,
        disabled: false,
      });
      dispatch(hideLoading());
    } catch (error) {
      setState({ ...state, disabled: false });
      dispatch(hideLoading());
      alert(err.message);
    }
  };

  const confirmSignUp = async () => {
    try {
      const { email, code } = this.state;
      await Auth.confirmSignUp(email, code);
      setState({
        ...state,
        code: '',
        email: '',
        disabled: false,
        auth: true,
        verify: false,
      });
      dispatch(hideLoading());
      alert('Account successfully created!');
    } catch (error) {
      this.setState({ ...this.state, disabled: false });
      dispatch(hideLoading());
      alert(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    setState({ ...state, disabled: true });
    if (state.verify) {
      confirmSignUp();
    } else {
      signUp();
    }
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
