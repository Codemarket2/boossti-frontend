import * as React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import SocialSignIn from '../SocialSignIn';
import Wrapper from '../../../utils/Wrapper';

afterEach(cleanup);

describe('Sign In Component Test', () => {
  test('Sign In button is pressed', () => {
    const { getByText } = render(<SocialSignIn />, { wrapper: Wrapper });
    const orCaption = getByText('OR');
    expect(orCaption).toBeTruthy();
    const facebookSignInButton = getByText('Sign in with Google');
    expect(facebookSignInButton).toBeTruthy();
    const goggleSignInButton = getByText('Sign in with Facebook');
    expect(goggleSignInButton).toBeTruthy();
  });
});
