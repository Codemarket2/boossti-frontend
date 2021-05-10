import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import projectConfig from '@frontend/shared';
import LoginRegister from '../src/components/auth/LoginRegister';
import InitialLoading from '../src/components/common/InitialLoading';
import Nav from '../src/components/common/Nav';
import VerifyEmail from '../src/components/auth/VerifyEmail';

function Home({ emailVerified, initial, authenticated }) {
  const router = useRouter();

  if (initial && authenticated && emailVerified) {
    router.push('/');
  }

  if ((initial && !authenticated) || !emailVerified) {
    return (
      <div>
        <Nav />
        <Head>
          <title>{projectConfig.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container pt-3 pb-3">
          {authenticated && !emailVerified ? <VerifyEmail /> : <LoginRegister />}
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

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
    // emailVerified: auth.authenticated ? auth.data.attributes.email_verified : null
    emailVerified: true,
  };
};

export default connect(mapStateToProps)(Home);
