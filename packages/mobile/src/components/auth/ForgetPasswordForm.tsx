import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Caption } from 'react-native-paper';
import styled from 'styled-components/native';
import { useSignIn } from '@frontend/shared/hooks/auth';

const InputGroup = styled.View`
  margin: 8px 0px;
`;

export default function ForgetPasswordForm() {
  const [showPassword, setShowPassword] = useState(true);
  const { state, formik } = useSignIn({ onAlert: () => {} });
  return (
    <View>
      <InputGroup>
        <TextInput
          mode="outlined"
          label="Email"
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        {formik.errors.email && <Caption>Error {formik.errors.email}</Caption>}
      </InputGroup>
      <InputGroup>
        <Button
          style={{ paddingVertical: 8 }}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          mode="contained"
          onPress={formik.handleSubmit}>
          Get Reset Code
        </Button>
      </InputGroup>
    </View>
  );
}
