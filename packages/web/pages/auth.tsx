import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import projectConfig from '@frontend/shared';
import AuthScreen from '../src/screens/AuthScreen';
// import LinearProgress from '@material-ui/core/LinearProgress';
import InitialLoading from '../src/components/common/InitialLoading';
import Nav from '../src/components/common/Nav';

interface IProps {
  initial: boolean;
  authenticated: boolean;
}

function Home({ initial, authenticated }: IProps) {
  const router = useRouter();

  if (initial && authenticated) {
    router.push('/');
  }

  if (initial && !authenticated) {
    return (
      <div>
        {/* <LinearProgress color="secondary" className="w-100 position-absolute" /> */}
        <Nav />
        <Head>
          <title>{projectConfig.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container pt-3 pb-3">
          <AuthScreen />
        </div>
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

export default connect(mapStateToProps)(Home);
