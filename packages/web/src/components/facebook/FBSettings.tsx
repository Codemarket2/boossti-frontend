import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Facebook from '@material-ui/icons/Facebook';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GroupIcon from '@material-ui/icons/Group';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../common/Loading';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

const SignInWithFacebook = () => {
  const [state, setState] = useState({
    initial: false,
    connected: false,
    user: null,
    groups: [],
  });

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '496030015019232',
        xfbml: true,
        version: 'v11.0',
      });
      window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          // console.log('authResponse', authResponse);
          setState({ ...state, initial: true, connected: true });
        } else {
          setState({ ...state, initial: true, connected: false });
        }
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  useEffect(() => {
    if (state.connected) {
      getData();
    }
  }, [state.connected]);

  const handleSignIn = () => {
    // const fb = window.FB;
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        getUser();
      } else {
        window.FB.login(
          (response) => {
            if (!response || !response.authResponse) {
              return;
            }
            setState({ ...state, initial: true, connected: true });
            // getUser();
          },
          {
            // the authorized scopes
            // scope: 'public_profile,email',
            scope:
              'public_profile,email,user_managed_groups,publish_to_groups,groups_access_member_info',
            // return_scopes: true,
          },
        );
      }
    });
  };

  const getUser = () => {
    return new Promise((resolve) => {
      window.FB.api('/me', { fields: 'name,email,picture' }, (response) => {
        const user = {
          name: response.name,
          email: response.email,
          picture: response.picture,
        };
        resolve(user);
      });
    });
  };

  const getGroups = () => {
    return new Promise((resolve) => {
      window.FB.api('/me/groups', { fields: 'name,administrator,picture{url}' }, (response) => {
        let groups = response.data.filter((g) => g.administrator);
        console.log('groups', response);
        // setState({ ...state, user });
        resolve(groups);
      });
    });
  };

  const getData = async () => {
    const user = await getUser();
    const groups: any = await getGroups();
    // console.log('groups', user, groups);
    setState({ ...state, user, groups: groups });
  };

  if (!state.initial) {
    return <Loading />;
  }

  return (
    <div className="my-3">
      {state.connected ? (
        <Button
          startIcon={<Facebook />}
          data-testid="facebook-signin-button"
          fullWidth
          style={{ backgroundColor: '#4267B2', color: 'white' }}
          type="button"
          variant="contained"
          onClick={() =>
            window.FB.logout(function (response) {
              setState({ ...state, connected: false, user: null });
            })
          }>
          Disconnect Facebook Account
        </Button>
      ) : (
        <>
          <Button
            startIcon={<Facebook />}
            data-testid="facebook-signin-button"
            fullWidth
            style={{ backgroundColor: '#4267B2', color: 'white' }}
            type="button"
            variant="contained"
            onClick={handleSignIn}>
            Connect Facebook Account
          </Button>
          <Typography className="text-center">
            Connect Facebook account post on your facebook pages and groups
          </Typography>
        </>
      )}
      {state.connected && (
        <List>
          {state.user && (
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt={state.user.name} src={state.user.picture.data.url} />
              </ListItemAvatar>
              <ListItemText primary={state.user.name} secondary={state.user.email} />
            </ListItem>
          )}
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Groups" />
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default SignInWithFacebook;
