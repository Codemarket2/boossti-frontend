import React, { useState, useEffect } from 'react';
import { List, Divider, Subheading } from 'react-native-paper';
import { AccessToken } from 'react-native-fbsdk-next';
import Screen from '../common/Screen';
import FBButton from './FBButton';

export default function FacebookScreen({ navigation }: any) {
  const [state, setState] = useState<any>({ access: null, profile: null });
  useEffect(() => {
    getCurrentSession();
  }, []);

  const getCurrentSession = async () => {
    const currentAccessToken = await AccessToken.getCurrentAccessToken();
    setState({ ...state, access: currentAccessToken });
  };

  // const getProfile = async () => {
  //   const profile = await Profile.getCurrentProfile();
  //   console.log('get profile', profile);
  //   setState({ ...state, profile: profile });
  // };

  // useEffect(() => {
  //   if (state.access && !state.profile) {
  //     getProfile();
  //   }
  // }, [state.access]);

  // console.log('profile', state);
  return (
    <Screen safeArea style={{ paddingBottom: 100 }}>
      {/* {state.access && state.profile && (
        <List.Item
          title={state.profile.name}
          left={(props) => <Avatar.Image {...props} source={{ uri: state.profile.imageURL }} />}
        />
      )}
      <Divider /> */}
      {state.access && (
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
        state={state}
        handleLogout={() => setState({ ...state, access: null, profile: null })}
        getCurrentSession={getCurrentSession}
      />

      {!state.access && (
        <Subheading style={{ textAlign: 'center' }}>
          Connect your facebook account in order to manage your pages and group from our app
        </Subheading>
      )}
    </Screen>
  );
}
