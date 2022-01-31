import Link from 'next/link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  useGetMyNotifications,
  useGetNotificationList,
  useIsNotificationClicked,
  useNotificationSub,
} from '@frontend/shared/hooks/notification';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import CommentModel from './CommentModel';

export default function Notification() {
  const { state, setState } = useNotificationSub();
  const [List, setList] = useState([]);
  const [store, setStore] = useState({});
  const { notificationList } = useGetNotificationList();
  useEffect(() => {
    setList(notificationList);
  }, [notificationList]);

  useEffect(() => {
    setState({ ...state, notifications: store });
  }, [store]);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={(e) => setState({ ...state, showNotification: e.target })}>
          <Badge badgeContent={List?.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
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
            {List?.length > 0 && (
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

          {List?.length ? (
            List?.map((list) => (
              <NotificationListItem
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
      </Popover>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={state.showSnack}
        autoHideDuration={4000}
        onClose={() => setState({ ...state, showSnack: false })}
      >
        <NotificationItem
          onClose={() => setState({ ...state, showSnack: false })}
          notification={state}
        />
      </Snackbar>
    </>
  );
}

const NotificationListItem = ({ list, store, setStore, state }) => {
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
            <NotificationItem notification={notification} onClose={() => {}} />
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
    handleNotificationClicked(notification._id);
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
      icon={<NotificationsIcon fontSize="inherit" />}
      onClose={onClose}
    >
      <AlertTitle>
        {notification.link ? (
          <Link href={notification.link}>
            <div style={{ cursor: 'pointer' }} onClick={handleClick}>
              {notification.title || 'New Notification'}
            </div>
          </Link>
        ) : (
          <div style={{ cursor: 'pointer' }} onClick={handleClick}>
            <CommentModel notification={notification} />
          </div>
        )}
      </AlertTitle>
      {notification.description}
    </Alert>
  );
};
