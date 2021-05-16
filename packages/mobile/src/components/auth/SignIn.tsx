import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {Formik} from 'formik';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const InputGroup = styled.View`
  margin: 8px 0px;
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => console.log(values)}
      validationSchema={SignInSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <InputGroup>
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons name={'email'} size={20} />
                  )}
                />
              }
              mode="outlined"
              label="Email"
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {/* <Text>{errors.email} = e</Text> */}
          </InputGroup>
          <InputGroup>
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons name={'lock'} size={20} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  name={() => (
                    <MaterialCommunityIcons
                      name={!showPassword ? 'eye' : 'eye-off'}
                      size={20}
                    />
                  )}
                />
              }
              secureTextEntry={showPassword}
              mode="outlined"
              label="Password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          </InputGroup>
          <InputGroup>
            <Button
              style={{paddingVertical: 8}}
              // loading={true}
              mode="contained"
              onPress={handleSubmit}>
              Sign in
            </Button>
          </InputGroup>
        </View>
      )}
    </Formik>
  );
}
