import React from 'react';
import { View } from 'react-native';
import { Button, Caption, Headline } from 'react-native-paper';
import { useVerifyEmail } from '@frontend/shared/hooks/auth';
import Input from '../common/Input';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';

interface IProps {
  email: string;
  onSuccess: () => void;
  disabled?: boolean;
}

export default function SignInForm({ email, onSuccess, disabled = false }: IProps) {
  const { formik } = useVerifyEmail({ onAlert, email, onSuccess });
  return (
    <View>
      <Headline>Verify Email</Headline>
      <Caption>Verification Code has been sent to {email}</Caption>
      <InputGroup>
        <Input
          keyboardType="number-pad"
          label="Verification Code"
          placeholder="Verification Code"
          disabled={disabled || formik.isSubmitting}
          onChangeText={formik.handleChange('code')}
          onBlur={formik.handleBlur('code')}
          value={formik.values.code}
          error={formik.touched.code && Boolean(formik.errors.code)}
          errorMessage={formik.errors.code}
        />
      </InputGroup>
      <InputGroup>
        <Button
          loading={disabled || formik.isSubmitting}
          disabled={disabled || formik.isSubmitting}
          mode="contained"
          onPress={formik.handleSubmit}>
          Verify Email
        </Button>
      </InputGroup>
    </View>
  );
}
