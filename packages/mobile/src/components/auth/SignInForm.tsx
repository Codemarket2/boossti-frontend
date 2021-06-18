import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Caption, Subheading } from 'react-native-paper';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSignIn } from '@frontend/shared/hooks/auth';
import SocialSignIn from './SocialSignIn';

const InputGroup = styled.View`
  margin: 8px 0px;
`;

interface IProps {
  handleForgetPassword: () => void;
}

export default function SignInForm({ handleForgetPassword }: IProps) {
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
          Sign in
        </Button>
      </InputGroup>
      <InputGroup>
        <TouchableOpacity disabled={formik.isSubmitting} onPress={handleForgetPassword}>
          <Subheading style={{ textAlign: 'center', marginTop: 10 }}>Forget Password?</Subheading>
        </TouchableOpacity>
      </InputGroup>
      <SocialSignIn />
    </View>
  );
}
