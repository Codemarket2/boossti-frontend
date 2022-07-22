import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import ErrorLoading from '../common/ErrorLoading';

interface ILikeModal {
  open: boolean;
  handleOpenLikeModal: any;
  handleCloseLikeModal: any;
  totalLike: number;
  threadId: string;
}

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function LikeModal({
  open,
  handleOpenLikeModal,
  handleCloseLikeModal,
  totalLike,
  threadId,
}: ILikeModal) {
  const { data, error } = useGetLikes(threadId);
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleCloseLikeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseLikeModal}>
        {totalLike && totalLike} Like
      </BootstrapDialogTitle>
      {!data || error ? (
        <ErrorLoading error={error} />
      ) : (
        <DialogContent dividers>
          {data?.getLikesByThreadId?.data?.map((user) => (
            <List key={user._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={user.createdBy.name} src={user.createdBy.picture} />
                </ListItemAvatar>
                <ListItemText primary={user.createdBy.name} />
              </ListItem>
            </List>
          ))}
        </DialogContent>
      )}
    </Dialog>
  );
}
