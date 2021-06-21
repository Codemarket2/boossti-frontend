import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Subheading } from 'react-native-paper';
import { useSignIn } from '@frontend/shared/hooks/auth';
import SocialSignIn from './SocialSignIn';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';
import { onAlert } from '../../utils/alert';
import VerifyEmailForm from './VerifyEmailForm';
import InputGroup from '../common/InputGroup';
import Button from '../../components/common/Button';
import ForgetPasswordForm from './ForgetPasswordForm';

export default function SignInForm() {
  const { state, setState, formik } = useSignIn({ onAlert });

  if (state.showForgetPasswordForm) {
    return (
      <>
        <ForgetPasswordForm
          handleShowSignInForm={() => setState({ ...state, showForgetPasswordForm: false })}
        />
      </>
    );
  } else if (state.verify) {
    return (
      <VerifyEmailForm
        email={state.email}
        onSuccess={formik.handleSubmit}
        disabled={formik.isSubmitting}
        label="Sign In Again"
        handleLabelClick={() => setState({ ...state, verify: false })}
      />
    );
  } else {
    return (
      <View>
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
            Sign In
          </Button>
        </InputGroup>
        <InputGroup>
          <TouchableOpacity
            disabled={formik.isSubmitting}
            onPress={() => setState({ ...state, showForgetPasswordForm: true })}>
            <Subheading style={{ textAlign: 'center', marginTop: 10 }}>Forgot Password?</Subheading>
          </TouchableOpacity>
        </InputGroup>
        <SocialSignIn />
      </View>
    );
  }
}
