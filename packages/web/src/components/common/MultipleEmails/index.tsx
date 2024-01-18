/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import InputGroup from '../InputGroup';

interface IProps {
  formik: any;
  state: any;
  setState: any;
}
export default function index({ formik, state, setState }: IProps) {
  useEffect(() => {
    if (state.resetEmails) {
      formik.setFieldValue('receiverEmail', state.receiverEmail, false);
    }
  }, [state.receiverEmail]);

  const handleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
      error: null,
      resetEmails: true,
    });
  };

  const handleDelete = (toBeRemoved) => {
    setState({
      ...state,
      receiverEmail: state.receiverEmail.filter((email) => email !== toBeRemoved),
    });
  };
  function isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  function isInList(email) {
    return state.receiverEmail.find((e) => e === email);
  }

  function isValid(email) {
    let error = null;
    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (error) {
      setState({ ...state, error });

      return false;
    }

    return true;
  }

  const handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      const email = state.value.trim();
      if (email && isValid(email)) {
        setState({
          ...state,
          receiverEmail: [...state.receiverEmail, email],
          value: '',
          error: null,
        });
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData('text');
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter((email) => !isInList(email));

      setState({ ...state, receiverEmail: [...state.receiverEmail, ...toBeAdded] });
    }
  };
  return (
    <>
      <InputGroup>
        <TextField
          fullWidth
          label="To"
          variant="outlined"
          name="receiverEmail"
          size="small"
          type="email"
          placeholder="Type or paste email addresses and press `Enter`"
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={state.value}
          onChange={handleChange}
          error={
            (state.error && Boolean(state.error)) ||
            (formik.touched.receiverEmail && Boolean(formik.errors.receiverEmail))
          }
          helperText={state.error || (formik.touched.receiverEmail && formik.errors.receiverEmail)}
        />
      </InputGroup>
      {state.receiverEmail.map((email) => (
        <React.Fragment key={email}>
          <Chip label={email} onDelete={() => handleDelete(email)} />
        </React.Fragment>
      ))}
    </>
  );
}
