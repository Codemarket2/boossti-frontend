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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import GroupIcon from '@material-ui/icons/Group';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../common/Loading';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

interface IProps {
  showUser?: boolean;
}

const SignInWithFacebook = ({ showUser = false }: IProps) => {
  const [state, setState] = useState({
    initial: false,
    connected: false,
    user: null,
    groups: [],
    selectedGroups: [],
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
            return_scopes: true,
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
        resolve(groups);
      });
    });
  };

  // const postToGroup = (groupId: string, message) => {
  //   return new Promise((resolve, reject) => {
  //     window.FB.api(`/${groupId}/feed`, 'post', { message: message }, (response) => {
  //       if (!response || response.error) {
  //         reject(response.error);
  //       } else {
  //         resolve(response);
  //       }
  //     });
  //   });
  // };

  const getData = async () => {
    const user = await getUser();
    const groups: any = await getGroups();
    const selectedGroups: any = JSON.parse(localStorage.getItem('selectedGroups'));
    setState({
      ...state,
      user,
      groups: groups,
      selectedGroups: selectedGroups ? selectedGroups : [],
    });
  };

  const handleOnChange = (event) => {
    const groupId = event.target.value;
    let tempSelectedGroups = [];
    if (event.target.checked) {
      tempSelectedGroups = [...state.selectedGroups, groupId];
      setState({ ...state, selectedGroups: tempSelectedGroups });
    } else {
      tempSelectedGroups = state.selectedGroups.filter((g) => g !== groupId);
      setState({ ...state, selectedGroups: tempSelectedGroups });
    }
    localStorage.setItem('selectedGroups', JSON.stringify(tempSelectedGroups));
  };

  if (!state.initial) {
    return <Loading />;
  }

  return (
    <div className="my-3">
      {!state.connected && (
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
          <Typography className="text-center mt-2">
            Connect your Facebook Account to autopost to your groups
          </Typography>
        </>
      )}
      {state.connected && (
        <>
          <List>
            {showUser && state.user && (
              <>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt={state.user.name} src={state.user.picture.data.url} />
                  </ListItemAvatar>
                  <ListItemText primary={state.user.name} secondary={state.user.email} />
                </ListItem>
              </>
            )}
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Autopost to Groups"
                secondary="You can turn on/off the autopost button next to group name"
              />
            </ListItem>
            <Divider />
            {state.groups.map((group) => (
              <ListItem key={group.id} button>
                <ListItemAvatar>
                  <Avatar alt={group.name} src={group.picture.data.url} />
                </ListItemAvatar>
                <ListItemText primary={group.name} />
                <ListItemSecondaryAction>
                  <Tooltip title="Turn on/off autopost">
                    <Switch
                      edge="end"
                      onChange={handleOnChange}
                      checked={state.selectedGroups.indexOf(group.id) > -1}
                      value={group.id}
                      color="primary"
                    />
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            startIcon={<Facebook />}
            data-testid="facebook-signin-button"
            fullWidth
            style={{ backgroundColor: '#4267B2', color: 'white' }}
            type="button"
            variant="contained"
            onClick={() =>
              window.FB.logout(function (response) {
                setState({
                  ...state,
                  connected: false,
                  user: null,
                  groups: [],
                  selectedGroups: [],
                });
                localStorage.removeItem('selectedGroups');
              })
            }>
            Disconnect Facebook Account
          </Button>
          {/* <Button
            startIcon={<Facebook />}
            data-testid="facebook-signin-button"
            fullWidth
            style={{ backgroundColor: '#4267B2', color: 'white' }}
            type="button"
            variant="contained"
            onClick={async () => {
              try {
                const res = await postToGroup(state.selectedGroups[0], 'Hello Guys from API');
                console.log('postToGroup', res);
              } catch (error) {
                console.log('postToGroup error', error);
              }
            }}>
            Create Post 
          </Button>*/}
        </>
      )}
    </div>
  );
};

export default SignInWithFacebook;
