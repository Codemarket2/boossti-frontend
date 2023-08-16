import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import { useGetPagesByTemplate, useCreatePage } from '@frontend/shared/hooks/template';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ErrorLoading from '../common/ErrorLoading';

interface IProps {
  open: boolean;
  templateId: string;
  title: string;
  onClose: () => void;
  onSelect: (_id: string, name: string) => void;
}

export default function SelectTag({ open, onClose, templateId, title, onSelect }: IProps) {
  const { data, loading, error, state, setState } = useGetPagesByTemplate(templateId || null);

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
        <IconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent dividers>
        {error || !data || !data.getPages ? (
          <ErrorLoading error={error} />
        ) : (
          <DialogContentText id="scroll-dialog-description">
            <List component="div">
              {data.getPages.data.map((item) => (
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
