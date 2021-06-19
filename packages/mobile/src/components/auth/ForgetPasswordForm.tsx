import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Caption, Headline } from 'react-native-paper';
import { useForgetPassword } from '@frontend/shared/hooks/auth';
import InputGroup from '../common/InputGroup';
import Input from '../common/Input';
import { onAlert } from '../../utils/alert';
import PasswordInput from '../common/PasswordInput';
import Button from '../../components/common/Button';

export default function ForgetPasswordForm() {
  const navigation = useNavigation();
  const { state, formik1, formik2 } = useForgetPassword({
    onAlert,
    handleShowSignInForm: () => {
      onAlert('Password reset successful', 'Now Sign In with your email and new password');
      navigation.navigate('SignInScreen');
    },
  });

  if (state.verify) {
    return (
      <View>
        <Headline>Forget Password</Headline>
        <Caption>Verification Code has been sent to {state.email}</Caption>
        <InputGroup>
          <Input
            keyboardType="number-pad"
            label="Password reset code"
            placeholder="Password reset code"
            disabled={formik2.isSubmitting}
            onChangeText={formik2.handleChange('code')}
            onBlur={formik2.handleBlur('code')}
            value={formik2.values.code}
            error={formik2.touched.code && Boolean(formik2.errors.code)}
            errorMessage={formik2.errors.code}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            label="Password"
            placeholder="Password"
            disabled={formik2.isSubmitting}
            onChangeText={formik2.handleChange('password')}
            onBlur={formik2.handleBlur('password')}
            value={formik2.values.password}
            error={formik2.touched.password && Boolean(formik2.errors.password)}
            errorMessage={formik2.errors.password}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            disabled={formik2.isSubmitting}
            onChangeText={formik2.handleChange('confirmPassword')}
            onBlur={formik2.handleBlur('confirmPassword')}
            value={formik2.values.confirmPassword}
            error={formik2.touched.confirmPassword && Boolean(formik2.errors.confirmPassword)}
            errorMessage={formik2.errors.confirmPassword}
          />
        </InputGroup>
        <InputGroup>
          <Button
            loading={formik2.isSubmitting}
            disabled={formik2.isSubmitting}
            mode="contained"
            onPress={formik2.handleSubmit}>
            Reset Password
          </Button>
        </InputGroup>
      </View>
    );
  }

  return (
    <View>
      <Headline>Forget Password</Headline>
      <InputGroup>
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
          label="Email"
          placeholder="Email"
          disabled={formik1.isSubmitting}
          onChangeText={formik1.handleChange('email')}
          onBlur={formik1.handleBlur('email')}
          value={formik1.values.email}
          error={formik1.touched.email && Boolean(formik1.errors.email)}
          errorMessage={formik1.errors.email}
        />
      </InputGroup>
      <InputGroup>
        <Button
          loading={formik1.isSubmitting}
          disabled={formik1.isSubmitting}
          mode="contained"
          onPress={formik1.handleSubmit}>
          Get Password Reset Code
        </Button>
      </InputGroup>
    </View>
  );
}
