import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSignUp, useSignIn } from '@frontend/shared/hooks/auth';
import { useGetFormBySlug } from '@frontend/shared/hooks/form';
import LoadingButton from '../common/LoadingButton';
import VerifyEmailForm from './VerifyEmailForm';
import { onAlert } from '../../utils/alert';
import SocialSignIn from './SocialSignIn';
import PasswordInput from '../common/PasswordInput';
import InputGroup from '../common/InputGroup';
import FormView from '../form2/FormView';
import { FormPage } from '../form2/FormPage';

export default function SignUpForm() {
  // const slug = 'users';
  const { state, setState, formik } = useSignUp({ onAlert });
  const { onSubmit } = useSignIn({ onAlert });
  // const { data, error } = useGetFormBySlug(slug);
  // const [form, setForm] = useState<any[]>([]);

  // useEffect(() => {
  //   const tempForm = {
  //     ...data?.getFormBySlug,
  //     fields: data?.getFormBySlug?.fields?.filter((e) => !e?.label.toUpperCase().includes('ROLE')),
  //   };
  //   setForm(tempForm);
  // }, [data]);

  if (state.verify) {
    return (
      <VerifyEmailForm
        onSuccess={async () => {
          try {
            await onSubmit({ email: formik.values.email, password: formik.values.password });
          } catch (err) {
            formik.handleReset('');
            setState({
              ...state,
              email: '',
              verify: false,
            });
            onAlert(
              'Email Verified Successfully',
              'Please Sign In now with your email and password',
            );
          }
        }}
        email={state.email}
        label="Sign Up Again?"
        onLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} data-testid="signup-form">
        <InputGroup>
          <TextField
            fullWidth
            label="Name*"
            variant="outlined"
            type="text"
            name="name"
            size="small"
            disabled={formik.isSubmitting}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </InputGroup>
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
            fullWidth
            label="Password*"
            name="password"
            variant="outlined"
            size="small"
            disabled={formik.isSubmitting}
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
            data-testid="signup-button"
            type="submit"
            loading={formik.isSubmitting}
          >
            Sign Up
          </LoadingButton>
        </InputGroup>
      </form>
      <>
        <FormPage
          slug="users"
          settings={{ widgetType: 'form', whoCanSubmit: 'all' }}
          modifyForm={(form) => {
            const newForm: any = { ...form };
            newForm.fields = newForm?.fields?.map((field) => {
              const newField = { ...field };
              if (newField?.label?.toLowerCase() === 'roles') {
                newField.options.systemCalculatedAndSaved = true;
              }
              return newField;
            });
            return newForm;
          }}
        />
        <SocialSignIn signIn={false} />
      </>
    </>
  );
}
