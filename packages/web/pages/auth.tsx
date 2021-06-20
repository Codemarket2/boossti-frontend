import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import projectConfig from '@frontend/shared';
import AuthScreen from '../src/screens/AuthScreen';
import InitialLoading from '../src/components/common/InitialLoading';
import AppBar from '../src/components/common/AppBar';
import Container from '../src/components/common/Container';

interface IProps {
  initial: boolean;
  authenticated: boolean;
}

function Auth({ initial, authenticated }: IProps) {
  const router = useRouter();

  if (initial && authenticated) {
    router.push('/');
  }

  if (initial && !authenticated) {
    return (
      <div>
        <AppBar />
        <Head>
          <title>{projectConfig.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <AuthScreen />
        </Container>
      </div>
    );
  }
  return (
    <div>
      <InitialLoading />
    </div>
  );
}

const mapStateToProps = ({ auth }: any) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
  };
};

export default connect(mapStateToProps)(Auth);
