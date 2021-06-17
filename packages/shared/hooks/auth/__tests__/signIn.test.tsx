import React from 'react';
import Amplify from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '../../../redux';
import { useSignIn } from '../signIn';
import aws_exports from '../../../aws-exports';

Amplify.configure(aws_exports);

test('should use counter', async () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  const { result } = renderHook(
    () =>
      useSignIn({
        onAlert: (a, b) => {
          console.log(`${a} == ${b}`);
        },
      }),
    { wrapper },
  );
  expect(result.current.formik.values.email).toBe('');
  // act(() => {
  //   result.current.formik.handleChange({
  //     target: { value: 'contactvivekvt@gmail.com', name: 'email' },
  //   });
  // });
  // act(() => {
  //   result.current.formik.handleChange({
  //     target: { value: 'contactvivekvt@gmail.com', name: 'password' },
  //   });
  // });
  // expect(result.current.formik.values.email).toBe('contactvivekvt@gmail.com');
  // expect(result.current.formik.values.password).toBe('contactvivekvt@gmail.com');
  // act(() => {
  //   result.current.formik.handleSubmit();
  // });

  // Handle Submit Test
  // expect(result.current.formik.values.email).toBe('contactvivekvt@gmail.com');
  // const login1 = await result.current.onSubmit({
  //   email: 'contactvivekvt@gmail.com',
  //   password: uuidv4(),
  // });
  // expect(login1).toBe(false);
  // const login2 = await result.current.onSubmit({
  //   email: 'contactvivekvt@gmail.com',
  //   password: 'contactvivekvt@gmail.com',
  // });
  // expect(login2).toBe(true);
});
