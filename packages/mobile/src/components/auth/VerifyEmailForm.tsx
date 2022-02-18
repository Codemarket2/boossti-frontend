import React from 'react';
import { View } from 'react-native';
import { Caption, Title } from 'react-native-paper';
import { useVerifyEmail } from '@frontend/shared/hooks/auth';
import Input from '../common/Input';
import { onAlert } from '../../utils/alert';
import InputGroup from '../common/InputGroup';
import Button from '../../components/common/Button';

interface IProps {
  email: string;
  onSuccess: () => void;
  disabled?: boolean;
  label?: string;
  handleLabelClick: () => void;
}

export default function SignInForm({
  email,
  onSuccess,
  disabled = false,
  label,
  handleLabelClick,
}: IProps) {
  const { formik } = useVerifyEmail({ onAlert, email, onSuccess });
  return (
    <View>
      <Title>Verify Email</Title>
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
          onPress={formik.handleSubmit}
        >
          Verify Email
        </Button>
      </InputGroup>
      <InputGroup>
        <Button mode="outlined" disabled={formik.isSubmitting} onPress={handleLabelClick}>
          Cancel
        </Button>
      </InputGroup>
    </View>
  );
}
