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
import { useFacebookSDK } from '../facebook/fbsdk';

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
        let groups = response.data.filter((g) => g.administrator);
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
            onClick={handleLogin}>
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
            onClick={handleLogout}>
            Disconnect Facebook Account
          </Button>
        </>
      )}
    </div>
  );
};

export default SignInWithFacebook;
