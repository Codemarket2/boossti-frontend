// import { Auth } from 'aws-amplify';
// import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import AuthScreen from '../src/screens/AuthScreen';
import InitialLoading from '../src/components/common/InitialLoading';
import UserLayout from '../src/components/common/UserLayout';

interface IProps {
  initial: boolean;
  authenticated: boolean;
}

function AuthPage({ initial, authenticated }: IProps) {
  const router = useRouter();

  // const { error_description } = router.query;

  // useEffect(() => {
  //   if (error_description) {
  //     if (error_description.includes('GOOGLE_ACCOUNT_LINKED')) {
  //       console.log('Google Login');
  //       Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  //     } else if (error_description.includes('FACEBOOK_ACCOUNT_LINKED')) {
  //       console.log('Facebook Login');
  //       Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
  //     }
  //   }
  // }, [error_description]);

  if (initial && authenticated) {
    router.push('/');
  }

  // !(error_description && error_description.includes('_ACCOUNT_LINKED'))

  if (initial && !authenticated) {
    return (
      <UserLayout>
        <AuthScreen />
      </UserLayout>
    );
  }
  return <InitialLoading />;
}

const mapStateToProps = ({ auth }: any) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
  };
};

export default connect(mapStateToProps)(AuthPage);
