import React from 'react';
import { LoginManager } from 'react-native-fbsdk-next';
import InputGroup from '../common/InputGroup';
import Button from '../common/Button';

export default function FBButton({ fbConnect, setFbConnect, getCurrentSession }: any) {
  return (
    <InputGroup>
      {fbConnect ? (
        <Button
          style={{ backgroundColor: '#4267B2' }}
          // disabled={false}
          onPress={async () => {
            try {
              await LoginManager.logOut();
              setFbConnect(null);
            } catch (error) {
              console.log(error);
            }
          }}
          mode="contained"
          icon="facebook">
          Disconnect Facebook Account
        </Button>
      ) : (
        <Button
          style={{ backgroundColor: '#4267B2' }}
          // disabled={false}
          onPress={async () => {
            try {
              const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'public_profile',
                'pages_show_list',
                'publish_to_groups',
                'groups_access_member_info',
                'pages_read_engagement',
                'pages_read_user_content',
                'pages_manage_posts',
              ]);
              await getCurrentSession();
            } catch (error) {
              console.log(error);
            }
          }}
          mode="contained"
          icon="facebook">
          Connect Facebook Account
        </Button>
      )}
    </InputGroup>
  );
}
