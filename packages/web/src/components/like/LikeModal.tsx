import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import ErrorLoading from '../common/ErrorLoading';

interface ILikeModal {
  open: boolean;
  handleOpenLikeModal: any;
  handleCloseLikeModal: any;
  totalLike: number;
  parentId: string;
}

const BootstrapDialogTitle = (props) => {
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
  parentId,
}: ILikeModal) {
  const { data, error } = useGetLikes(parentId);
  return (
    <Dialog
      fullWidth={true}
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
          {data.getLikesByParentId.data.map((user) => (
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
