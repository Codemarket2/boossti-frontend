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
import { useNotificationSub } from '@frontend/shared/hooks/notification';

export default function Notification() {
  const { state, setState } = useNotificationSub();
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={(e) => setState({ ...state, showNotification: e.target })}>
          <Badge badgeContent={state.notifications?.length} color="primary">
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
            {state.notifications.length > 0 && (
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => setState({ ...state, notifications: [] })}
              >
                Clear all
              </Button>
            )}
          </Typography>
          {state?.notifications?.length ? (
            state?.notifications?.map((notification, i) => {
              return (
                <NotificationItem
                  key={i}
                  notification={notification}
                  onClose={() =>
                    setState({
                      ...state,
                      notifications: state.notifications?.filter((n, ni) => ni !== i),
                    })
                  }
                />
              );
            })
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

const NotificationItem = ({ notification, onClose }: any) => {
  return (
    <Alert
      variant="filled"
      className="mt-1"
      icon={<NotificationsIcon fontSize="inherit" />}
      severity="success"
      onClose={onClose}
    >
      <AlertTitle>
        {notification.link ? (
          <Link href={notification.link}>
            <div style={{ cursor: 'pointer' }}>{notification.title || 'New Notification'}</div>
          </Link>
        ) : (
          notification.title || 'New Notification'
        )}
      </AlertTitle>
      {notification.description}
    </Alert>
  );
};
