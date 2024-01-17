import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Facebook from '@mui/icons-material/Facebook';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import GroupIcon from '@mui/icons-material/Group';
import Avatar from '@mui/material/Avatar';
import Loading from '../common/Loading';
import { useFacebookSDK } from './fbsdk';

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
  const {
    fbsdk: { fbsdkLoading, fbsdkConnected },
    handleLogin,
    handleLogout,
  } = useFacebookSDK();
  const [state, setState] = useState({ user: null, groups: [], selectedGroups: [] });

  useEffect(() => {
    if (fbsdkConnected) {
      getData();
    } else {
      setState({
        ...state,
        user: null,
        groups: [],
        selectedGroups: [],
      });
    }
  }, [fbsdkConnected]);

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
        const groups = response.data.filter((g) => g.administrator);
        resolve(groups);
      });
    });
  };

  const getData = async () => {
    const user = await getUser();
    const groups: any = await getGroups();
    const selectedGroups: any = JSON.parse(localStorage.getItem('selectedGroups'));
    setState({
      ...state,
      user,
      groups,
      selectedGroups: selectedGroups || [],
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

  if (fbsdkLoading && !fbsdkConnected) {
    return <Loading />;
  }

  return (
    <div className="my-3">
      {!fbsdkConnected && (
        <>
          <Button
            startIcon={<Facebook />}
            data-testid="facebook-signin-button"
            fullWidth
            style={{ backgroundColor: '#4267B2', color: 'white' }}
            type="button"
            variant="contained"
            onClick={handleLogin}
          >
            Connect Facebook Account
          </Button>
          <Typography className="text-center mt-2">
            Connect your Facebook Account to autopost to your groups
          </Typography>
        </>
      )}
      {fbsdkConnected && (
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
            {state.groups && state.groups.length > 0 ? (
              state.groups.map((group) => (
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
              ))
            ) : (
              <ListItemText primary="No groups Found" />
            )}
          </List>
          <Button
            startIcon={<Facebook />}
            data-testid="facebook-signin-button"
            fullWidth
            style={{ backgroundColor: '#4267B2', color: 'white' }}
            type="button"
            variant="contained"
            onClick={handleLogout}
          >
            Disconnect Facebook Account
          </Button>
        </>
      )}
    </div>
  );
};

export default SignInWithFacebook;
