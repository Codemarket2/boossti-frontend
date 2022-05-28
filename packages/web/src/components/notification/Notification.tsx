import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import moment from 'moment';
import {
  useGetMyNotifications,
  useGetNotificationList,
  useIsNotificationClicked,
  useNotificationSub,
} from '@frontend/shared/hooks/notification';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ListItemText from '@mui/material/ListItemText';
import { ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CommentModel from './CommentModel';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  minWidth: 25,
  minHeight: 25,
  margin: '0 auto',
  border: `2px solid ${theme.palette.primary.main}`,
}));

const StyledPopover = styled(Popover)(({ theme }) => ({
  width: '90% !important',
  [theme.breakpoints.up('md')]: {
    width: '50% !important',
  },
}));

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  width: '90% !important',
  [theme.breakpoints.up('md')]: {
    width: '50% !important',
  },
}));

export default function Notification() {
  const { state, setState } = useNotificationSub();
  const [store, setStore] = useState({});
  const [total, setTotal] = useState(0);
  const { notificationList } = useGetNotificationList();
  useEffect(() => {
    let t = 0;
    for (let i = 0; i < notificationList?.length; i += 1) {
      t += notificationList[i]?.notificationCount;
    }
    setTotal(t);
  }, [notificationList]);

  useEffect(() => {
    setState({ ...state, notifications: store });
  }, [store]);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          onClick={(e) => setState({ ...state, showNotification: e.target })}
          color="inherit"
          size="large"
        >
          <Badge badgeContent={total} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <StyledPopover
        className="mt-2"
        open={Boolean(state.showNotification)}
        anchorEl={state.showNotification}
        onClose={() => setState({ ...state, showNotification: null })}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="p-2" style={{ minWidth: '40vw' }}>
          <Typography variant="h5" className="d-flex justify-content-between align-items-center">
            Notifications
            {notificationList?.length > 0 && (
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => setState({ ...state })}
              >
                Clear all
              </Button>
            )}
          </Typography>
          {notificationList?.length ? (
            notificationList?.map((list) => (
              <NotificationPage
                key={list._id}
                list={list}
                store={store}
                setStore={setStore}
                state={state}
              />
            ))
          ) : (
            <Typography>You don&apos;t have any notifications</Typography>
          )}
        </div>
      </StyledPopover>
      <StyledSnackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={state.showSnack}
        autoHideDuration={4000}
        onClose={() => setState({ ...state, showSnack: false })}
      >
        <NotificationItem
          onClose={() => setState({ ...state, showSnack: false })}
          notification={state}
        />
      </StyledSnackbar>
    </>
  );
}

const NotificationPage = ({ list, store, setStore, state }: any) => {
  const { notifications } = useGetMyNotifications({ formId: list._id });

  useEffect(() => {
    setStore({ ...store, [list._id]: notifications });
  }, [notifications]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Badge color="secondary" badgeContent={list.notificationCount}>
          <Typography>{list?.lastNotification?.title}</Typography>
        </Badge>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block' }}>
        {state.notifications[list._id]?.map((notification) => (
          <div key={notification._id}>
            <NotificationItem notification={notification} onClose={() => null} />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const NotificationItem = ({ notification, onClose }: any) => {
  const [variant, setVariant] = useState(notification.isClicked);
  const { handleNotificationClicked } = useIsNotificationClicked();
  const handleClick = () => {
    handleNotificationClicked(notification._id, notification.threadId);
    setVariant(true);
  };
  const background = {
    backgroundColor: variant ? '#fff' : '#e2f0fe',
  };
  return (
    <Alert
      variant="outlined"
      className="mt-1"
      style={background}
      hidden={variant || notification?.isClicked}
      icon={<StyledAvatar src={notification.userId?.picture} alt="profile Pic" />}
      onClose={onClose}
    >
      <>
        {notification.link ? (
          <Link href={notification.link}>
            <div style={{ cursor: 'pointer' }} onClick={handleClick}>
              <ListItemText
                className="p-0 m-0"
                primary={<span dangerouslySetInnerHTML={{ __html: notification.description }} />}
                secondary={`${moment(notification.createdAt).fromNow()}`}
              />
            </div>
          </Link>
        ) : (
          <div style={{ cursor: 'pointer' }} onClick={handleClick}>
            <CommentModel notification={notification} />
          </div>
        )}
      </>
    </Alert>
  );
};
