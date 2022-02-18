import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import { useGetListItemsByType, useCreateListItem } from '@frontend/shared/hooks/list';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  open: boolean;
  typeId: string;
  title: string;
  onClose: () => void;
  onSelect: (_id: string, name: string) => void;
}

export default function SelectTag({ open, onClose, typeId, title, onSelect }: IProps) {
  const { data, loading, error, state, setState } = useGetListItemsByType({
    types: [typeId || null],
  });

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <div className="d-flex justify-content-between align-content-center align-items-center">
        <DialogTitle id="scroll-dialog-title">Select {title}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent dividers={true}>
        {error || !data || !data.getListItems ? (
          <ErrorLoading error={error} />
        ) : (
          <DialogContentText id="scroll-dialog-description">
            <List component="div">
              {data.getListItems.data.map((item) => (
                <ListItem button onClick={() => onSelect(item._id, item.title)}>
                  <ListItemText primary={item.title} secondary={item.description || null} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Update or Delete">
                      <ArrowRightIcon />
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
}
