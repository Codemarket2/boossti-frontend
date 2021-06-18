import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Caption } from 'react-native-paper';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSignUp } from '@frontend/shared/hooks/auth';
import SocialSignIn from './SocialSignIn';

const InputGroup = styled.View`
  margin: 8px 0px;
`;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(true);
  const { state, formik } = useSignUp({ onAlert: () => {} });
  return (
    <View>
      <InputGroup>
        <TextInput
          mode="outlined"
          label="Name"
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        {formik.errors.name && <Caption>Error {formik.errors.name}</Caption>}
      </InputGroup>
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
        <TextInput
          right={
            <TextInput.Icon
              onPress={() => setShowPassword(!showPassword)}
              name={() => (
                <MaterialCommunityIcons name={!showPassword ? 'eye' : 'eye-off'} size={20} />
              )}
            />
          }
          secureTextEntry={showPassword}
          mode="outlined"
          label="Password"
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        {formik.errors.password && <Caption>Error {formik.errors.password}</Caption>}
      </InputGroup>
      <InputGroup>
        <Button
          style={{ paddingVertical: 8 }}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          mode="contained"
          onPress={formik.handleSubmit}>
          Sign Up
        </Button>
      </InputGroup>
      <SocialSignIn />
    </View>
  );
}
