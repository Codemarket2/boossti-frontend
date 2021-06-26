import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSignUp, useSignIn } from '@frontend/shared/hooks/auth';
import SocialSignIn from './SocialSignIn';
import { onAlert } from '../../utils/alert';
import VerifyEmailForm from './VerifyEmailForm';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';
import InputGroup from '../common/InputGroup';
import Button from '../../components/common/Button';

export default function SignInForm() {
  const { state, setState, formik } = useSignUp({ onAlert });
  const { onSubmit } = useSignIn({ onAlert });
  const navigation = useNavigation();
  if (state.verify) {
    return (
      <VerifyEmailForm
        email={state.email}
        onSuccess={async () => {
          try {
            await onSubmit({ email: formik.values.email, password: formik.values.password });
          } catch (error) {
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
        label="Sign Up Again"
        handleLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  }
  return (
    <View>
      <InputGroup>
        <Input
          label="Name"
          placeholder="Name"
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          errorMessage={formik.errors.name}
        />
      </InputGroup>
      <InputGroup>
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
          label="Email"
          placeholder="Email"
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          errorMessage={formik.errors.email}
        />
      </InputGroup>
      <InputGroup>
        <PasswordInput
          label="Password"
          placeholder="Password"
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          errorMessage={formik.errors.password}
        />
      </InputGroup>
      <InputGroup>
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          mode="contained"
          onPress={formik.handleSubmit}>
          Sign Up
        </Button>
      </InputGroup>
      <SocialSignIn signIn={false} />
    </View>
  );
}
