import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import SignInForm from '../SignInForm';
import wrapper from '../../../utils/Wrapper';

afterEach(cleanup);

describe('Sign In Component Test', () => {
  test('Sign In button is pressed', () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(<SignInForm />, {
      wrapper,
    });

    // let authState = store.getState().auth;
    // expect(authState.authenticated).toEqual(false);

    // const emailInput = getByLabelText('Email');
    // expect(emailInput).toBeTruthy();
    // const passwordInput = getByPlaceholderText('Password');
    // expect(passwordInput).toBeTruthy();

    // const email = 'contactvivekvt@gmail.com';

    // fireEvent.changeText(emailInput, email);
    // fireEvent.changeText(passwordInput, email);

    const forgotPasswordLabel = getByText('Forgot Password?');
    expect(forgotPasswordLabel).toBeTruthy();
    const signInButton = getByText('Sign In');
    expect(signInButton).toBeTruthy();
    // fireEvent.press(signInButton);

    // const emailError = getByText('Email is required');
    // expect(emailError).toBeTruthy();

    // authState = store.getState().auth;

    // expect(authState.authenticated).toEqual(true);
  });
});
