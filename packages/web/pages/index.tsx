import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { useRouter } from 'next/router';
import InitialLoading from '../src/components/common/InitialLoading';
// import UserLayout from '../src/components/common/UserLayout';
import HomeScreen from '../src/screens/HomeScreen-new';

export default function Page() {
  const router = useRouter();
  const initial = useSelector(({ auth }: any) => auth.initial);
  const { error_description: errorDescription } = router.query;

  useEffect(() => {
    if (errorDescription) {
      if (errorDescription.includes('GOOGLE_ACCOUNT_LINKED')) {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
      } else if (errorDescription.includes('FACEBOOK_ACCOUNT_LINKED')) {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
      }
    }
  }, [errorDescription]);

  if ((errorDescription && errorDescription.includes('_ACCOUNT_LINKED')) || !initial) {
    return <InitialLoading />;
  }

  return (
    <>
      <HomeScreen />
      <DisplayLighthouseData />
    </>
  );
}

const DisplayLighthouseData = () => {
  const { data, loading } = useGetLightHouseData();

  return (
    <div className="container pb-5">
      {loading ? (
        <Card variant="outlined">
          <CircularProgress size={20} /> - Loading lighthouse data
        </Card>
      ) : (
        Object.keys(data).map((keyName, i) => (
          <Card variant="outlined" className="p-2">
            <b>{keyName}</b>
            <br />
            {JSON.stringify(data[keyName])}
          </Card>
        ))
      )}
    </div>
  );
};

const useGetLightHouseData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://us-central1-boossti.cloudfunctions.net/lightHouseHTTP',
        { params: { url: 'https://www.boossti.com', id: 2 } },
      );
      setData(response.data);
    } catch (error) {
      alert(`Error while fetching the data, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};
