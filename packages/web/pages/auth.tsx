import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@frontend/shared/redux';
import AuthScreen from '../src/screens/AuthScreen';
import InitialLoading from '../src/components/common/InitialLoading';
import UserLayout from '../src/components/common/UserLayout';

const mapStateToProps = ({ auth }: RootState) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {
  initial: boolean;
  authenticated: boolean;
}

function AuthPage({ initial, authenticated }: IProps) {
  const router = useRouter();

  if (initial && authenticated) {
    // router.push('/feed');
    router.push('/');
  }

  if (initial && !authenticated) {
    return (
      <UserLayout>
        <AuthScreen />
      </UserLayout>
    );
  }
  return <InitialLoading />;
}

export default connector(AuthPage);
