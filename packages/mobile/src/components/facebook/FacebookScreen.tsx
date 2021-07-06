import React, { useState, useEffect } from 'react';
import { List, Divider, Subheading } from 'react-native-paper';
import { AccessToken } from 'react-native-fbsdk-next';
import Screen from '../common/Screen';
import FBButton from './FBButton';

export default function FacebookScreen({ navigation }: any) {
  const [fbConnect, setFbConnect] = useState<any>(null);
  useEffect(() => {
    getCurrentSession();
  }, []);

  const getCurrentSession = async () => {
    const currentAccessToken = await AccessToken.getCurrentAccessToken();
    setFbConnect(currentAccessToken);
  };

  return (
    <Screen safeArea style={{ paddingBottom: 100 }}>
      {fbConnect && (
        <>
          <List.Item
            title="Pages"
            onPress={() => navigation.navigate('PagesScreen')}
            left={(props) => <List.Icon {...props} icon="flag" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Groups"
            onPress={() => navigation.navigate('GroupsScreen')}
            left={(props) => <List.Icon {...props} icon="account-group" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </>
      )}
      <FBButton
        fbConnect={fbConnect}
        setFbConnect={setFbConnect}
        getCurrentSession={getCurrentSession}
      />

      {!fbConnect && (
        <Subheading style={{ textAlign: 'center' }}>
          Connect your facebook account in order to manage your pages and group from our app
        </Subheading>
      )}
    </Screen>
  );
}
