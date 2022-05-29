import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import AuthScreen from '../src/screens/AuthScreen';
import InitialLoading from '../src/components/common/InitialLoading';
import UserLayout from '../src/components/common/UserLayout';
import { FormPage } from '../src/components/form2/FormPage';

interface IProps {
  initial: boolean;
  authenticated: boolean;
}

function AuthPage({ initial, authenticated }: IProps) {
  const router = useRouter();

  if (initial && authenticated) {
    router.push('/feed/my');
    // router.push(process.env.NEXT_PUBLIC_REDIRECT_URL || '/');
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

const mapStateToProps = ({ auth }: any) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
  };
};

export default connect(mapStateToProps)(AuthPage);
