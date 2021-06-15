import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { setAuthUser, initialAuthUser } from '../../redux/actions/auth';
import { useInitialUser } from '../users';
export { useSignIn } from './signIn';
export { useSignUp } from './signUp';
export { useForgetPassword } from './forgetPassword';
export { useVerifyEmail } from './verifyEmail';

export function useCurrentAuthenticatedUser(): null {
  const dispatch = useDispatch();
  useInitialUser();
  const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false,
        };
        dispatch(setAuthUser(data));
      }
    } catch (error) {
      dispatch(initialAuthUser());
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return null;
}
