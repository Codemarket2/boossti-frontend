import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface IProps {
  onDelete: () => void;
  onClose: () => void;
  onEdit: () => void;
  show: any;
}

export default function CRUDMenu({ show, onDelete, onEdit, onClose }: IProps) {
  return (
    <Menu anchorEl={show} keepMounted open={Boolean(show)} onClose={onClose}>
      <MenuItem onClick={onEdit}>
        <ListItemIcon className="mr-n4">
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <ListItemIcon className="mr-n4">
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  );
}
