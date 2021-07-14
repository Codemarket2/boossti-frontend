import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

interface IProps {
  open: boolean;
  selectedList: any;
  onClose: () => void;
  onSelect: (_id: string, name: string) => void;
}

export default function SelectTag({ open, onClose, selectedList, onSelect }: IProps) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
      <div className="d-flex justify-content-between align-content-center align-items-center">
        <DialogTitle id="scroll-dialog-title">Select Doctors</DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          // ref={descriptionElementRef} tabIndex={-1}
        >
          <List component="div">
            {selectedList &&
              selectedList.items &&
              selectedList.items.map((item, index) => (
                <>
                  {index > 0 && <Divider />}
                  <ListItem button onClick={() => onSelect(item._id, item.title)}>
                    <ListItemText primary={item.title} secondary={item.description || null} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Update or Delete">
                        <ArrowRightIcon />
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </>
              ))}
          </List>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
